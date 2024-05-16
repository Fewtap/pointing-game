import { IonBackButton, IonCard, IonCardContent, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, createAnimation, IonButton } from "@ionic/react";
import './WIML.css';
import { Question } from "../interfaces";
import questionsData from '../questions.json';
import NHIEQuestions from '../NHIE.json';
import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router";

const WIML: React.FC = () => {
    const cardEl = useRef<HTMLIonCardElement | null>(null);
    const [filteredQuestions, setFilteredQuestions] = useState<Question[] | string[]>([]);
    const [questionIndex, setQuestionIndex] = useState(0);

    const { type, game } = useParams<{ type?: string, game?: string }>();

    function shuffleArray(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    useEffect(() => {
    if (game === "WIML") {
        if (type) {
            let filteredQuestions = questionsData.items.filter(question => question.category.includes(type));
            shuffleArray(filteredQuestions);
            setFilteredQuestions(filteredQuestions);
        } else {
            setFilteredQuestions([]);
        }
    } else if (game === "NHIE") {
        if (type && typeof type === 'string') {
            let filteredQuestions = NHIEQuestions.neverHaveIEverQuestions[type as keyof typeof NHIEQuestions.neverHaveIEverQuestions] || [];
            shuffleArray(filteredQuestions);
            setFilteredQuestions(filteredQuestions);
        } else {
            setFilteredQuestions([]);
        }
    }
}, [type, game]);

    const nextQuestion = () => {
        const hideAnim = createAnimation()
            .addElement(cardEl.current!)
            .duration(300)
            .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
            .fromTo('opacity', '1', '0');

        hideAnim.play().then(() => {
            setQuestionIndex(prevIndex => (prevIndex + 1) % filteredQuestions.length);
            const showAnim = createAnimation()
                .addElement(cardEl.current!)
                .duration(300)
                .fromTo('transform', 'translateX(-100px)', 'translateX(0px)')
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
                        <IonTitle>{`WIML ${type ?? 'Default'}`}</IonTitle>
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
                                <h1>{typeof filteredQuestions[questionIndex] === 'string' 
                                    ? filteredQuestions[questionIndex] 
                                    : filteredQuestions[questionIndex].content}
                                </h1>
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
