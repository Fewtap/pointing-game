import { IonBackButton, IonCard, IonCardContent, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from "@ionic/react";
import './WIML.css';
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import NHIEQuestionsData from '../NHIE.json';
import WIMLQuestionsData from '../questions.json';
import { motion, AnimatePresence } from 'framer-motion';

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

    const [filteredQuestions, setFilteredQuestions] = useState<string[]>([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [showQuestion, setShowQuestion] = useState(true);

    const { type, game } = useParams<{ type?: string, game?: string }>();

    function shuffleArray(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    //Check which game is selected and if the type is in the questions data
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
    }, [type, game]);


    /**
     * Function to show the next question
     * It will hide the current question and show the next one after a short delay
     * 
     */
    const nextQuestion = () => {
        setShowQuestion(false);
        setTimeout(() => {
            setQuestionIndex(prevIndex => (prevIndex + 1) % filteredQuestions.length);
            setShowQuestion(true);
        }, 500); // Duration matching the exit animation
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <div className="flex">
                        <IonBackButton mode="md" />
                        <IonTitle
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            fontSize: "0.8em",
                        }}
                        >
                            {game === "WIML" ? type : game === "NHIE" ? "Never have I ever " + type : ""}
                        </IonTitle>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "100%"
            }}>
                {filteredQuestions.length > 0 ? (
                    <div style={{display: "flex", flexDirection:"column", width:"80%", marginInline:"auto", height: "80%", position: "relative"}}>
                        <AnimatePresence>
                            {showQuestion && (
                                <motion.div
                                    key={questionIndex}
                                    initial={{ opacity: 0, x: 100, scale: 0.8, rotate: 15 }}
                                    animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                                    exit={{ opacity: 0, x: -100, scale: 0.8, rotate: -15 }}
                                    transition={{ duration: 0.5, ease: "backInOut" }}
                                    style={{ position: "absolute", width: "100%" }}
                                >
                                    <IonCard style={{
                                        width: "100%",
                                        maxWidth: "100%",
                                        minHeight: "50%",
                                        maxHeight: "50%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "column",
                                        margin: "2rem auto",
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
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <IonButton style={{ marginTop: "auto", borderRadius: "5% !improtant" }} onClick={nextQuestion}>Next Question</IonButton>
                    </div>
                ) : (
                    <div>No questions available for this category.</div>
                )}
            </IonContent>
        </IonPage>
    );
}

export default WIML;
