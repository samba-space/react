import { Tab, Table, TableBody, TableCell, TableRow, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import dateformat from "dateformat";
import Detail from './Detail';


const ChartList = () => {

    let [charts, setCarts] = useState([]);
    const [tab, setTab] = useState('dome');
    let [id, setId] = useState(0);
    let [detail, setDetail] = useState(false);

    useEffect(() => {
        if (tab === 'dome') {
            axios.get('http://localhost:3300/v1/chart/domestic')
                .then((response) => {
                    console.log(response);
                    setCarts(response.data.chartList)
                });
        }
        else {
            axios.get('http://localhost:3300/v1/chart/overseas')
                .then((response) => {
                    console.log(response);
                    setCarts(response.data.chartList)
                });
        }
    }, [tab]);

    const handleChange = (event, value) => {
        setTab(value);
    };

    const handleRowClick = (id) => {
        setId(id);
        setDetail(true);
    }

    const handleBackClick = () => {
        setDetail(false);
    }

    return (
        <>
            {
                detail === false ? (
                    <StyledDiv>
                        <div>음악 차트</div>
                        <div>{dateformat(Date.now(), "yyyy년 mm월 dd일 HH:MM")}</div>
                        <div>
                            <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="국내" value='dome' />
                                <Tab label="해외" value='over' />
                            </Tabs>
                        </div>
                        <Table>
                            <TableBody>
                                {
                                    charts.map(chart => (
                                        <TableRow key={chart.id} onClick={() => handleRowClick(chart.id)}>
                                            <TableCell>{chart.rank}</TableCell>
                                            <TableCell><img src={'./images/' + chart.imageFile} /></TableCell>
                                            <TableCell><StyledDiv1>{chart.title}</StyledDiv1></TableCell>
                                            <TableCell><StyledDiv2>{chart.singer}</StyledDiv2></TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </StyledDiv>
                ) : (
                    <Detail
                        id={id}
                        handleBackClick={handleBackClick}
                    />
                )
            }
        </>
    );
};

const StyledDiv = styled.div`
width: 500px;
`

const StyledDiv1 = styled.div`
width:100px;
padding:0 5px;
overflow:hidden;
text-overflow:ellipsis;
white-space:nowrap;
text-align: left;
`

const StyledDiv2 = styled.div`
width:80px;
padding:0 5px;
overflow:hidden;
text-overflow:ellipsis;
white-space:nowrap;
text-align: right;
`

export default ChartList;