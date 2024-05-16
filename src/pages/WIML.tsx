import { IonBackButton, IonCard, IonCardContent, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, createAnimation, IonButton } from "@ionic/react";
import './WIML.css';
import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router";
import NHIEQuestionsData from '../NHIE.json';
import WIMLQuestionsData from '../questions.json';

const WIML: React.FC = () => {

    interface NeverHaveIEverQuestions {
        [key: string]: string[];
    }
    
    interface WhoIsMostLikelyQuestions {
        [key: string]: string[];
    }
    
    interface QuestionsData {
        neverHaveIEverQuestions: NeverHaveIEverQuestions;
        whoIsMostLikelyQuestions: WhoIsMostLikelyQuestions;
    }

    const NHIEQuestions: NeverHaveIEverQuestions = NHIEQuestionsData.neverHaveIEverQuestions;
    const WIMLQuestions: WhoIsMostLikelyQuestions = WIMLQuestionsData.WIML;

    const cardEl = useRef<HTMLIonCardElement | null>(null);
    const [filteredQuestions, setFilteredQuestions] = useState<string[]>([]);
    const [questionIndex, setQuestionIndex] = useState(0);

    const { type, game } = useParams<{ type?: string, game?: string }>();

    function shuffleArray(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    useEffect(() => {
        if (game === "NHIE" && type && type in NHIEQuestions) {
            const questions = NHIEQuestions[type];
            shuffleArray(questions);
            setFilteredQuestions(questions);
        } else if (game === "WIML" && type && type in WIMLQuestions) {
            const questions = WIMLQuestions[type];
            shuffleArray(questions);
            setFilteredQuestions(questions);
        }

        console.log(type);
    }, [type, game]);

    const nextQuestion = () => {
        const hideAnim = createAnimation()
            .addElement(cardEl.current!)
            .duration(300)
            .fromTo('transform', 'translateX(0px)', 'translateX(-100px)')
            .fromTo('opacity', '1', '0');

        hideAnim.play().then(() => {
            setQuestionIndex(prevIndex => (prevIndex + 1) % filteredQuestions.length);
            const showAnim = createAnimation()
                .addElement(cardEl.current!)
                .duration(300)
                .fromTo('transform', 'translateX(100px)', 'translateX(0px)')
                .fromTo('opacity', '0', '1');
            showAnim.play();
        });
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <div className="flex">
                        <IonBackButton mode="md" />
                        <IonTitle>{game == "WIML" ? "Who is more likely " + type : game == "NHIE" ? "Never have i ever " + type : ""}</IonTitle>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "100%"
            }}>
                {filteredQuestions.length > 0 ? (
                    <div style={{display: "flex", flexDirection:"column", width:"80%", marginInline:"auto", height: "80%"}}>
                        <IonCard ref={cardEl} style={{
                            width: "100%",
                            maxWidth: "100%",
                            minHeight: "50%",
                            maxHeight: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            margin: "auto",
                            padding: "1rem",
                            borderRadius: "1rem",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                            textAlign: "center",
                            transition: "all 0.3s ease-in-out",
                        }}>
                            <IonCardContent>
                                <h1>{filteredQuestions[questionIndex]}</h1>
                            </IonCardContent>
                        </IonCard>
                        <IonButton onClick={nextQuestion}>Next Question</IonButton>
                    </div>
                ) : (
                    <div>No questions available for this category.</div>
                )}
            </IonContent>
        </IonPage>
    );
}

export default WIML;
