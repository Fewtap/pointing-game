import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { useHistory } from 'react-router';
import questions from '../NHIE.json'
import './Tab2.css';

const Tab2: React.FC = () => {
  const keys = Object.keys(questions.neverHaveIEverQuestions);

  const history = useHistory();

  function sendHistory(type: string) {
      history.push({
          pathname: "/NHIE" + "/" + type, 
          
      });
  }

  return (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Never Have I Ever</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <div className="container">
              {keys.map((key, index) => {
                return (
                  <IonButton key={key} onClick={() => sendHistory(key)}>
                      {key}
                  </IonButton>
                )
              }
              )}
                
            </div>
        </IonContent>
    </IonPage>
);
};

export default Tab2;
