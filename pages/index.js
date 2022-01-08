import {useRef, useState} from "react";
import {useRouter} from "next/router";

function HomePage() {

    const emailInputRef = useRef();
    const feedbackInputRef = useRef();
    const [feedbackItems, setFeedbackItems] = useState([]);
    const router = useRouter();

    const submitFormHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredFeedback = feedbackInputRef.current.value;

        const reqBody = {
            email: enteredEmail,
            text: enteredFeedback
        }

        fetch('/api/feedback', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(data => console.log(data)); //{email:xxx, text. xxx }

    }

    const loadFeedbackHandler = (event) => {

        fetch('/api/feedback')
            .then(resp => resp.json())
            .then(data => {
                setFeedbackItems(data.feedbacks);
            });
    }

    function loadFeedbackOverviewHandler() {
        router.push('/feedback');
    }

    return (
        <div>
            <h1>The Home Page</h1>
            <form onSubmit={submitFormHandler}>
                <div>
                    <label htmlFor="email">E-Mail</label><br/>
                    <input type="email" id='email' ref={emailInputRef}/>
                </div>
                <div>
                    <label htmlFor="feedback">Feedback</label><br/>
                    <textarea rows='5' type="text" id='feedback' ref={feedbackInputRef}/>
                </div>
                <button>send feedback</button>
            </form>
            <hr/>
            <button onClick={loadFeedbackHandler}>Load Feedbacks ...</button>
            <button onClick={loadFeedbackOverviewHandler}>Show Feedbacks ...</button>
            <ul>
                {feedbackItems.map(item => <li key={item.id}>{item.text}</li>)}
            </ul>
        </div>
    );
}

export default HomePage;
