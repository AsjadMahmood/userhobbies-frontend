import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { post } from 'axios';
import * as axios from 'axios';
import { addUser, addHobby, removeHobby } from '../actions/index';
import * as uuid from 'uuid';
// import Select from 'react-select';
import './user.css';

function User(props) {
    const users = useSelector(function (state) { return state.users });
    const hobbies = useSelector(function (state) { return state.hobbies });
    const initialStateUser = { name: '' }
    const [user, setFieldsuser] = useState(initialStateUser)
    const dispatch = useDispatch();
    const initialStateHobby = { userId: '', passion: '', hobby: '', year: '' };
    const [hobby, setFieldshobby] = useState(initialStateHobby);
    const [userHobbies, setUserHobbyField] = useState([]);
    const [selectedUserId, setUserIdField] = useState(null);

    function handleUserChange(event) {
        setFieldsuser({ ...user, [event.target.name]: event.target.value });
    }

    //for adding user
    function handleUserSubmit(event) {
        const myId = uuid.v4();
        event.preventDefault();
        if (!user.name) return
        post('/api/user/add', { id: myId, name: user.name })
            .then(function (response) {
                dispatch(addUser(response.data));
            })
            .then(function () {
                props.history.push("/");
            })
            .catch(function (error) { console.log(error); });
    };


    function handleHobbyChange(event) {
        setFieldshobby({ ...hobby, [event.target.name]: event.target.value });
    }

    //for adding hobbies
    function handleHobbySubmit(event) {
        const myId = uuid.v4();
        event.preventDefault();
        if (!hobby.passion) return
        post('/api/hobbies/add', { id: myId, userId: selectedUserId, passion: hobby.passion, hobby: hobby.hobby, year: hobby.year })
            .then(function (response) {
                dispatch(addHobby(response.data));
                setUserHobbyField(userHobbies => [...userHobbies, response.data]);
            })
            .then(function () {
                props.history.push("/");
            })
            .catch(function (error) { console.log(error); });
    };

    //when a user is clicked
    function showUserHobbies(id) {
        setUserIdField(id);
        let userhobbies = hobbies.filter(function (el) {
            return el.userId === id
        });
        setUserHobbyField(userhobbies);
    }

    //deleting a hobby
    function handleDelete(id) {
        axios.delete(`/api/hobbies/delete/${id}`)
            .then(function () {
                dispatch(removeHobby(id));
                setUserHobbyField(userHobbies.filter(item => item.id !== id));
                props.history.push("/")
            })
            .catch(function (error) { console.log('error', error) });
    }

    return (
        <div>
            <div className="jumbotron">
                <h1>User Hobbies</h1>
            </div>
            <div className="row">
                <div className="col-sm-3 table-wrapper-scroll-y my-custom-scrollbar">

                    <table className="table table-bordered mb-0">
                        <thead>
                            <tr>
                                <td>
                                    <form onSubmit={handleUserSubmit}>
                                        <div className="form-group">
                                            <input type="text" name="name" required value={user.name}
                                                onChange={handleUserChange} className="form-control"
                                                placeholder="Enter User Name" />
                                        </div>
                                        <div  className="btn-group">
                                            <input style={{ textAlign: 'center' }} type="submit" value="Add" className="btn btn-success" />
                                        </div>
                                    </form>
                                </td>
                            </tr>
                        </thead>
                        {users.length && users.map(function (user) {
                            return (
                                <tbody>
                                    <tr onClick={() => { showUserHobbies(user.id) }} style={{ cursor: 'pointer' }} key={user.id}>
                                        <td>{user.name}</td>
                                    </tr>
                                </tbody>
                            );
                        })}
                    </table>
                </div>
                {selectedUserId !== null &&
                    <div className="col-sm-9 table-wrapper-scroll-y my-custom-scrollbar">
                        <form id="my_form" ></form>
                        <table className="table table-bordered table-striped mb-0">
                            <thead>
                                <tr>
                                    <td>
                                        {/* <Select
                                            placeholder="Select Passion"
                                            value={hobby.passion} // set selected value
                                            options={data} // set list of the data
                                            onChange={handleHobbySelect} // assign onChange function
                                            name="passion"
                                        /> */}
                                        <select required form="my_form" className="custom-select" name="passion" value={hobby.passion} onChange={handleHobbyChange}>
                                            <option  value="select">Select Passion</option>
                                            <option value="High">High</option>
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                        </select>
                                    </td>
                                    <th>
                                        <div className="form-group">
                                            <input form="my_form" type="text" name="hobby" required value={hobby.hobby} onChange={handleHobbyChange}
                                                className="form-control" placeholder="Enter User Hobby" />
                                        </div>
                                    </th>
                                    <th>
                                        <div className="form-group">
                                            <input form="my_form" type="number" name="year" required value={hobby.year} onChange={handleHobbyChange}
                                                min="1900" max="2020" className="form-control" placeholder="Enter Year" />
                                        </div>
                                    </th>
                                    <th>
                                        <input form="my_form" type="submit" value=" Add " onClick={handleHobbySubmit} 
                                        className="btn btn-success" />

                                    </th>
                                </tr>
                            </thead>
                            {userHobbies.length ? userHobbies.map(function (hobby) {
                                return (
                                    <tbody>
                                        <tr>
                                            <td>Passion:{hobby.passion}</td>
                                            <td>{hobby.hobby}</td>
                                            <td>Since{hobby.year}</td>
                                            <td>
                                                <button type="submit" onClick={() => { handleDelete(hobby.id) }}
                                                    className="btn btn-danger">
                                                    Delete
                                    </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                );
                            }): null}
                        </table>
                        {userHobbies.length === 0 &&
                            <p style={{ textAlign: 'center' }}>No Hobbies for Selected User</p>
                        }
                    </div>}
            </div>
        </div>
    )
}

export default User; 