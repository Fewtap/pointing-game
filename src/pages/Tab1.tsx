import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import { useHistory } from 'react-router';


const Tab1: React.FC = () => {
    const history = useHistory();

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
                    <IonButton onClick={() => sendHistory("Dirty")}>
                        Dirty
                    </IonButton>
                    <IonButton onClick={() => sendHistory("Couples")}>
                        Couples
                    </IonButton>
                    <IonButton onClick={() => sendHistory("Work")}>
                        Work
                    </IonButton>
                    <IonButton onClick={() => sendHistory("Friends")}>
                        Friends
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
