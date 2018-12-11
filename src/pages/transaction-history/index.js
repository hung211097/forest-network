import React, { Component } from 'react';
import styles from './index.scss';
import { Layout } from '../../components'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { makeData } from '../../services/utils.service';

class TransactionHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [{
                publicKey: "GA6IW2JOWMP4WGI6LYAZ76ZPMFQSJAX4YLJLOQOWFC5VF5C6IGNV2IW7",
                publicKeyReceived: "GAO4J5RXQHUVVONBDQZSRTBC42E3EIK66WZA5ZSGKMFCS6UNYMZSIDBI",
                operation: "payment",
                amount: 100000000000,
                createAt: "2018-12-11 15:01:27.965+07"
            },
            {
                publicKey: "Huỳnh",
                publicKeyReceived: "Hưng",
                operation: "payment",
                amount: 20,
                createAt: "2018-12-11 15:01:27.965+07"
            }]
        };
    }
    render() {
        const { data } = this.state
        console.log(data)

        return (
            <Layout>
                <br />
                <br />
                <br />
                <br />
                <div style={{marginBottom: '5rem'}} className={styles.transactionHistory}>
                    <ReactTable
                        data={data}
                        columns={[
                            {
                                Header: "User",
                                columns: [
                                    {
                                        Header: "Public Key",
                                        accessor: "publicKey"
                                    }
                                ]
                            },
                            {
                                Header: "Transaction History",
                                columns: [
                                    {
                                        Header: "Public Key Received",
                                        accessor: "publicKeyReceived"
                                    },
                                    {
                                        Header: "Operation",
                                        accessor: "operation",
                                    },
                                    {
                                        Header: "Amount",
                                        accessor: "amount",
                                    },
                                    {
                                        Header: "Create At",
                                        accessor: "createAt",
                                    }
                                ]
                            }
                        ]}
                        defaultPageSize={10}
                        style={{
                            height: "400px" // This will force the table body to overflow and scroll, since there is not enough room
                        }}
                        className="-striped -highlight"
                    />
                </div>
            </Layout>
        );
    }
}

export default TransactionHistory;
