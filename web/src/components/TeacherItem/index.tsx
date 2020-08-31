import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import './style.css'
import api from '../../Server/api'
export interface Teacher {
    id: number;
    name: string;
    avatar: string;
    subject: string;
    whatsapp: string;
    bio: string;
    cost: number
}
interface TeacherItemProps {
    teacher: Teacher;
}

const TeacherItem: React.FunctionComponent<TeacherItemProps> = ({ teacher }) => {
    function createNewConnection() {
        api.post('connections', {
            user_id:teacher.id
        })
    }

    return (
        <article className="teacher-item">
                    <header>
                        <img src={teacher.avatar} alt={teacher.avatar}/>
                        <div>
                            <strong>{teacher.name}</strong>
                            <span>{teacher.subject}</span>
                        </div>
                        
                    </header>
                    <p>{teacher.bio}</p>
                        <footer>
                            <p>
                                Preço/Hora
                                <strong>R$ {teacher.cost}</strong>
                            </p>
                            <a onClick={createNewConnection} href={`https://wa.me/${teacher.whatsapp}`}>
                                <img src={whatsappIcon} alt="Whatsapp"/>
                                Entrar em contato
                            </a>
                        </footer>
                </article>
    )
}
export default TeacherItem;