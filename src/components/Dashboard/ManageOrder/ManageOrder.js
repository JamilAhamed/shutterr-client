import React, { useEffect, useState } from 'react';
import Sidebar from '../../Shared/Sidebar/Sidebar';
import './ManageOrder.css'
import TableRow from "./TableRow/TableRow";
import loader from '../../../images/infinity_loop_-_logo.gif'
import toast, { Toaster } from 'react-hot-toast';
import swal from 'sweetalert';
import { useHistory } from 'react-router';

const ManageOrder = () => {
    const [update, setUpdate] = useState(false)
    const [allOrders, setAllOrders] = useState([]);
    const [demo, setDemo] = useState(false);
    const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
    const history = useHistory();
    useEffect(() => {
        if (loggedInUser.isAdmin === 'false') {
            history.replace('/');
        }
        if (loggedInUser.email === 'admin-demo@specta.com') {
            setDemo(true);
            toast.error("You are a demo admin,you can't");
        }
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/allOrders')
            .then(res => res.json())
            .then(data => setAllOrders(data))
    }, [update]);
    const handleDelete = (id) => {
        swal({
            title: "connection done?",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    if (demo) {
                        swal("Sorry!", "You are a demo admin", "warning");
                    }
                    else {
                        fetch(`http://localhost:5000/deleteOrder/${id}`, {
                            method: "DELETE"
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data) {
                                    setUpdate(!update);
                                }
                            })
                        swal("Order Cancelled Successfully !", {
                            icon: "success",
                        });
                    }
                } else {
                    swal("Your order is safe!");
                }
            });



    }
    const handleUpdate = (updatedData) => {
        const { id, value } = updatedData;
        fetch(`http://localhost:5000/updateOrder/${id}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ status: value })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    swal("Order status updated !", {
                        icon: "success",
                    });
                    setUpdate(!update);

                }
            })

    }

    return (
        <section className="dashboard-container">
            <Sidebar />
            <div className="dashboard-area">
                <div className="section-header">
                    <h1>Manage Order</h1>
                </div>

                {allOrders.length === 0 ?
                    <img style={{ width: "150px" }} src={loader} alt="" /> :
                    <table className="table-container">
                        <thead>
                            <th>Sr.</th>
                            <th>Name</th>
                            <th className='s-none'>Email</th>
                            <th>Service</th>
                            <th> Status </th>
                            <th> Action</th>
                        </thead>
                        <tbody>
                            {
                                allOrders.map((data, index) => <TableRow serial={allOrders.length} id={index + 1} key={index + 1} data={data} handleDelete={handleDelete} handleUpdate={handleUpdate} ></TableRow>)
                            }
                        </tbody>
                    </table>

                }


            </div>
        </section>
    );
};

export default ManageOrder;