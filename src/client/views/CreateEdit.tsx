import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import moment from 'moment';
import { IChirpDataArray } from '../types';

const CreateEdit = (props: CreateEditProps) => {
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [chirp, setChirp] = useState(null);
    const [username, setUsername] = useState('');
    const [chirpContent, setChirpContent] = useState('');
    const [chirpContentPlaceholder, setChirpContentPlaceholder] = useState('');

    const handleUsernameChange = e => {
        setUsername(e.target.value);
    }

    const handleChirpContentChange = e => {
        setChirpContent(e.target.value);
    }

    const handleChirp = () => {
        if(props.isEdit) {
            if (username && chirpContent !== '') {
                updateChirp();
                history.push(`/details/${id}`);
            } else {
                setChirpContentPlaceholder('Please make sure you have set your username and provided Chrip content.');
            }
        } else {
            if (username && chirpContent !== '') {
                createChirp();
                history.push('/');
            } else {
                setChirpContentPlaceholder('Please make sure you have set your username and provided Chrip content.');
            }
        }
    }

    async function createChirp() {
        try {
            const data = { 
                name: username,
                content: chirpContent,
                date: Date.now()
            }
            const res = await fetch('/api/chirps', {
                method: 'POST',
                mode: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.log(error);
        }
    }

    async function updateChirp() {
        try {
            const data = { 
                name: username,
                content: chirpContent,
                date: Date.now()
            }
            const res = await fetch(`/api/chirps/${id}`, {
                method: 'PUT',
                mode: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.log(error);
        }
    }

	useEffect(() => {
		if(props.isEdit) {
            async function getChrip() {
                try {
                    const res = await fetch('/api/chirps/' + id);
                    const chirpData = await res.json();
                    setChirp(chirpData);
                    setUsername(chirpData.name);
                    setChirpContent(chirpData.content);
                } catch (error) {
                    console.log(error);
                }
            }
            getChrip();      
        }
	}, []);

	return (
		<div className="row justify-content-center">
            <div className="col-sm-4">
                { props.isEdit ? <></> : <h3>What's happening?</h3> }
                <textarea className="form-control mb-2" id="chirpContent" onChange={handleChirpContentChange} placeholder={chirpContentPlaceholder} value={chirpContent}></textarea>
                <div className="d-flex justify-content-between">
                    <div className="input-group w-50">
                        <span className="input-group-text" id="basic-addon1">@</span>
                        <input id="username" value={username} type="text" className="form-control" placeholder="Username" aria-label="Username" onChange={handleUsernameChange} />
                    </div>
                    <Button variant="primary" onClick={handleChirp}>
                        { props.isEdit ? <>Edit</> : <>Chirp</> }
                    </Button>
                </div>
            </div>
        </div>
	);
};

interface CreateEditProps {
    isEdit: boolean;
}

export default CreateEdit;
