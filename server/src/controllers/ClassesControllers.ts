import { Request , Response } from 'express';
import convertHoursToMinutes from "../utils/convertHourstoMinutes";
import db from "../database/connection";


interface ScheduleItem {
    week_day:Number,
    from:string,
    to:string,
}
export default class ClassesControllers{
    async index(request: Request, response:Response) {
        const filters = request.query;

        const week_day = filters.week_day as string;
        const subject = filters.subject as string;
        const time = filters.time as string;

        if(!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error:"Missing filters in search classes"
            })
        }
        const timeInMinutes = convertHoursToMinutes(time)

        console.log(timeInMinutes);

      

        const classes = await db('classes')
        .whereExists(function() {
            this.select('class_schedule.*')
            .from('class_schedule')
            .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
            .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
            .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
            .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
        })
        .where( 'classes.subject' , '=' , subject )
        .join('users' , 'classes.user_id', '=', 'users.id')
        .select(['classes.*', 'users.*'])
        return response.json(classes);
    }

      async create( request:Request , response:Response ) {
        const { name, whatsapp , bio , cost , subject , avatar , schedule } = request.body;
    
        const trx = await db.transaction();
    
        try {
            // A variável criada (insertedUsersId) retorna todas informações que foram inseridas na tabela,
        //e para adicionar a aula é preciso do id do usuário para criar uma chave estrangeira na tabala classes.
        //Então para retornar o id é só pegar o primeiro valor do array e inserir em outra variável (user_id);
         const insertedUsersId =  await trx('users').insert({
            name,
            whatsapp,
            bio,
            avatar,
        })
    
        const user_id = insertedUsersId[0]
    
        const insertedClassesId = await trx('classes').insert({
            user_id,
            subject,
            cost,
        })
    
        const class_id = insertedClassesId[0]
    
        const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
            return {
                class_id,
                week_day: scheduleItem.week_day,
                from: convertHoursToMinutes(scheduleItem.from),
                to: convertHoursToMinutes(scheduleItem.to)
            }
        })
        await trx('class_schedule').insert(classSchedule);
    
        await trx.commit()
    
        return response.status(201).send()
        } catch (err){
            trx.rollback();
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            })
        }
    }
}