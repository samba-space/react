import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';


const Detail = (props) => {
    const { id, handleBackClick } = props;
    const [ chartDetail, setChartDetail ] = useState({});

    useEffect(() => {
        axios.get('http://localhost:3300/v1/chart/detail/' + id)
            .then((response) => {
                setChartDetail(response.data.chart)
            });
    }, []);

    const handelClick = () => {
        handleBackClick();
    }

    const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    `

    const StyledDivRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    `
    const StyledDivLeft = styled.div`
    margin-left: 110px;
    width: 50px;
    text-align: left;
    `

    const StyledDivRight = styled.div`
    text-align: right;
    width: 50px;
    `

    return (
        <div>
            <div>
                <img
                    style={{ height: "50px", cursor: "pointer" }}
                    src={"/images/back_arrow.png"}
                    alt={"fallback.png"}
                    onClick={handelClick}
                />
            </div>
            <StyledDiv>
                <div>
                    {chartDetail.title}

                </div>
                <div>
                    {chartDetail.singer}
                </div>
            </StyledDiv>
            <div>
                <StyledDivRow><StyledDivRight>작사</StyledDivRight><StyledDivLeft>{chartDetail.lyricist}</StyledDivLeft></StyledDivRow>
                <StyledDivRow><StyledDivRight>작곡</StyledDivRight><StyledDivLeft>{chartDetail.melodizer}</StyledDivLeft></StyledDivRow>
                <StyledDivRow><StyledDivRight>장르</StyledDivRight><StyledDivLeft>{chartDetail.genre}</StyledDivLeft></StyledDivRow>
            </div>
        </div>
    );
};


export default Detail;