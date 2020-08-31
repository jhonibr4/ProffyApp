import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'

import PageHeader from '../../components/PageHeader';

import './style.css';
import Input from '../../components/Input';

import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../Server/api';

function TeacherForm(){

    const history = useHistory();

    const [ name , setName ] = useState('');
    const [ avatar , setAvatar ] = useState('');
    const [ whatsapp , setWhatsapp ] = useState('');
    const [ bio , setBiografia ] = useState('');
    
    const [ subject , setSubject ] = useState('');
    const [ cost , setCost ] = useState('');


    const [ scheduleItems , setScheduleItems ] = useState([
        {week_day: 0 , from: '', to: ''}
    ])

    function addNewScheduleItem(){
        //...(Spread) e utilizado para copiar tudo que já existe dentro do array e coloca-ló
        // dentro do Array novamento porém agora com as novas informações. 
        setScheduleItems([ 
            ...scheduleItems,
            {week_day: 0 , from: '', to: ''}
        ]);
        
        
    }

    function setScheduleItemsValue(position:number , field:string , value:string) {
        // O motivo de ter o (field) dentro de um array é para manter o nome da variavel (week_day)
        const updateScheduleItems = scheduleItems.map((scheduleItem , index) => {
            if(index === position){
                return { ...scheduleItem, [field]: value }
            }

            return scheduleItem;
        })
        setScheduleItems(updateScheduleItems)
    }

    function headlerCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes', { 
            name, 
            avatar,
            whatsapp, 
            bio, 
            subject, 
            cost: Number(cost), 
            schedule: scheduleItems 
        }).then(response => {
            alert('Cadastro efetuado com sucesso!');

            history.push('/')
        }).catch(response => {
            alert('Erro ao Cadastrar!')
        })

       
    }


    

    return (
    <div id="page-teacher-form" className="container">
        <PageHeader
            title="Que incrível que você quer dar aulas."
            description="O primeiro passo é preencher esse formulário de inscrição."
        />
        <main>
            <form onSubmit={headlerCreateClass}>
            <fieldset>
                <legend>Seus dados</legend>
                    
                    <Input 
                        name="name" 
                        label="Nome completo" 
                        value={name}
                        onChange={(e) => {setName(e.target.value)}}
                        />
                    <Input 
                        name="avatar" 
                        label="Avatar" 
                        value={avatar}
                        onChange={(e) => {setAvatar(e.target.value)}}
                    />
                    <Input 
                        name="whatsapp" 
                        label="WhatsApp" 
                        value={whatsapp}
                        onChange={(e) => {setWhatsapp(e.target.value)}}
                    />
                    <Textarea 
                        name="bio" 
                        label="Biografia" 
                        value={bio}
                        onChange={(e) => {setBiografia(e.target.value)}}
                    />
                   
                   
            </fieldset>
            <fieldset>
                <legend>Sobre a aula</legend>
                
                    <Select 
                        name="subject" 
                        label="Matéria" 
                        value={subject}
                        onChange={(e) => {setSubject(e.target.value)}}
                        options={[
                            { value:'Artes', label:'Artes' },
                            { value:'Biologia', label:'Biologia' },
                            { value:'Ciências', label:'Ciências' },
                            { value:'Educação fisica', label:'Educação fisica' },
                            { value:'Física', label:'Física' },
                            { value:'Geografia', label:'Geografia' },
                            { value:'História', label:'História' },
                            { value:'Matemática', label:'Matemática' },
                            { value:'Português', label:'Português' },
                            { value:'Química', label:'Química' },
                        ]}
                       
                        />
                    <Input name="cost" 
                    label="Custo da sua hora por aula" 
                    value={cost}
                    onChange={(e) => {setCost(e.target.value)}}
                    />
            </fieldset>
            <fieldset>
                <legend>Horários Disponiveis
                    <button type='button' onClick={addNewScheduleItem}>+ Novo Horário</button>
                </legend>
                {scheduleItems.map((scheduleItem , index) => {
                    return (
                        <div key={scheduleItem.week_day} className="schedule-item">
                        <Select 
                            name="week_day" 
                            label="Dia da semana" 
                            value={scheduleItem.week_day}
                            onChange={e => setScheduleItemsValue(index , 'week_day' , e.target.value)}
                            options={[
                                { value:'0', label:'Domingo' },
                                { value:'1', label:'Segunda-Feira' },
                                { value:'2', label:'Terça-Feira' },
                                { value:'3', label:'Quarta-Feira' },
                                { value:'4', label:'Quinta-Feira' },
                                { value:'5', label:'Sexta-Feira' },
                                { value:'6', label:'Sábado' },
                            ]}    
                        />
                        <Input 
                        name="from"
                        label="Das" 
                        type="time"
                        value={scheduleItem.from}
                        onChange={e => setScheduleItemsValue(index , 'from' , e.target.value)}
                        />
                        <Input 
                        name="to" 
                        label="Até" 
                        type="time"
                        value={scheduleItem.to}
                        onChange={e => setScheduleItemsValue(index , 'to' , e.target.value)}
                        />
                    </div>
                    )
                })}
            </fieldset>
            <footer>
                <p>
                    <img src={warningIcon} alt="Aviso Importante"/>
                    Importante <br />
                    Preencha todos os dados
                </p>
                <button type="submit">Salvar Cadastro</button>
            </footer>
        </form>
        </main>
    </div>
    )
}
export default TeacherForm;