import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import { useHistory } from 'react-router';
import WIML from '../questions.json'


const Tab1: React.FC = () => {
    const history = useHistory();

    const keys = Object.keys(WIML.WIML);

    function sendHistory(type: string) {
        history.push({
            pathname: "WIML" + "/" + type, 
            
        });
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Who Is More Likely</IonTitle>
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

export default Tab1;
