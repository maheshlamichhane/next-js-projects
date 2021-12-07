import { Fragment, useState } from 'react';
import { buildFeedBackPath,extractFeedback} from '../api/feedback'; 
function FeedbackPage (props) {

    const [feedbackData, setFeedbackData] = useState();


    function loadFeedbackHandler(id) {
         fetch(`/api/${id}`)
         .then((response) => response.json()).then((data) => {
              console.log(data.feedback);
              setFeedbackData(data.feedback);
         });
    }


    return (
      <Fragment>
          
          { feedbackData && <p>{feedbackData.text}</p>}
        <ul>
          {props.feedbackItems.map((item) => (
            <li key={item.id}>
              {item.text}
              <button onClick={loadFeedbackHandler.bind(null, item.id)}>
                Show Details
              </button>
            </li>
          ))}
        </ul>
      </Fragment>
    );
}

export async function getStaticProps() {
    // we can't use fetch inside getstaticprops for api route
    const filePath = buildFeedBackPath();
    const data = extractFeedback(filePath);
    return {
        props: {
            feedbackItems: data
        }
    }
}
export default FeedbackPage;