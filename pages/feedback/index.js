import React, {useState} from 'react';
import {buildFeedbackPath, extractFeedback} from "../api/feedback";
import Link from "next/link";

const FeedbackPage = (props) => {

    const [feedbackData, setFeedbackData] = useState();

    const loadFeedbackHandler = (id) => {
        fetch(`/api/feedback/${id}`)
            .then(resp => resp.json())
            .then(data => {
                setFeedbackData(data.feedback)
            })
    }
    return (

        <>
            <h1><Link href='/'>Feedbacks</Link></h1>
            {feedbackData && <p>{feedbackData.email}</p>}
            <ul>
                {props.feedbackItems.map(item => (
                    <li key={item.id}>{item.text}
                        <button onClick={(id) => loadFeedbackHandler(item.id)}>Det</button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export async function getStaticProps(context) {
    const path = buildFeedbackPath();
    const data = extractFeedback(path);

    return {
        props: {
            feedbackItems: data
        }
    }
}

export default FeedbackPage;
