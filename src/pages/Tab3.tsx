import { IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div
        style={{
          width: '50%',
          borderRadius: '50%',
          margin: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          flexDirection: 'column',
        }}  
        >
          <img style={{
            height: '25%',
            borderRadius: '50%',
          }}
          
          src="/assets/images/image.png"></img>
          <h1>About Page</h1>
          <p>This is a simple app that allows you to play a couple of drinking games with your friends.</p>
          <h5>Thanks to:</h5>
          <ul
          style={{
            listStyleType: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '0',

          }}
          >
            <li>Juli</li>
            <li>Wouter</li>
            <li>Ionic</li>
            <li>Typescript</li>
            <li>React</li>
            </ul>

            <p
            style={{
              
              textAlign: 'center',
              fontSize: '0.8em',
              color: 'grey',
            
            }}
            >Made by: Fewtap</p>
          </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
