import { IonBackButton, IonCard, IonCardContent, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, createAnimation, IonButton } from "@ionic/react";
import './WIML.css';
import { Question } from "../interfaces";
import questionsData from '../questions.json';
import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router";

const WIML: React.FC = () => {
    const location = useLocation<{ type?: string }>(); // Optional type
    const cardEl = useRef<HTMLIonCardElement | null>(null);
    const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
    const [questionIndex, setQuestionIndex] = useState(0);

    useEffect(() => {
        // Check if type is available in location state
        if (location.state?.type) {
            const filtered = questionsData.items.filter(q => q.category.includes(location.state.type!));
            setFilteredQuestions(filtered);
        }
    }, [location.state]);

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
                        <IonTitle>{`WIML ${location.state?.type ?? 'Default'}`}</IonTitle>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen style={{
                display: "flex !important",
                justifyContent: "center !important",
                alignContent: "center !important",
                alignItems: "center !important",
                flexDirection: "column !important",
                height: "100% !important"
            
            }}>
                {filteredQuestions.length > 0 ? (
                    <div style={{display: "flex", flexDirection:"column", width:"80%", justifyContent: "center", alignContent:"center", marginInline:"auto"}}>
                    <IonCard ref={cardEl}>
                        <IonCardContent>
                            <h1>{filteredQuestions[questionIndex].content}</h1>
                            
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
