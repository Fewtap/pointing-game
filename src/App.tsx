import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonImg,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { beerOutline, ellipse, searchCircleOutline, skullOutline, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import WIML from './pages/WIML';
import NHIE from './pages/NHIE';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/WhoIsMoreLikely">
            <Tab1 />
          </Route>
          <Route exact path="/NeverHaveIEver">
            <Tab2 />
          </Route>
          <Route path="/about">
            <Tab3 />
          </Route>
          <Route exact path="/WIML">
            <WIML />
          </Route>
          <Route exact path={["/:game/:type", "/WIML"]}>
            <WIML />
          </Route>
          <Route exact path="/">
            <Redirect to="/WhoIsMoreLikely" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/WhoIsMoreLikely">
            <IonIcon aria-hidden="true" icon={searchCircleOutline} />
            <IonLabel>Who is More Likely</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/NeverHaveIEver">
            <IonIcon aria-hidden="true" icon={skullOutline} />
            <IonLabel>Never Have I Ever</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/About">
            <IonIcon aria-hidden="true" icon={beerOutline} />
            <IonLabel>About</IonLabel>
          </IonTabButton>
          
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
