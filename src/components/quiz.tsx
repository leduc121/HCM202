"use client";
import { useState } from "react";
import { ArrowRight, RotateCcw, Check, X } from "lucide-react";
import { quiz } from "@/src/data/quiz";
import { site } from "@/src/data/site";
import { SectionLabel } from "./shared";
export function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const q = quiz[current];
  const answer = answers[current];
  const score = answers.filter((a, i) => a === quiz[i].correctAnswer).length;
  if (!quiz.length) return null;
  return (
    <section id="kiem-tra" className="quiz-section">
      <div className="section quiz-layout">
        <div>
          <SectionLabel number="09">Dừng lại & suy ngẫm</SectionLabel>
          <h2 data-reveal>{site.quiz.title}</h2>
          <p>{site.quiz.description}</p>
        </div>
        <div className="quiz-panel">
          {finished ? (
            <div className="quiz-result" aria-live="polite">
              <span className="meta">{site.quiz.result}</span>
              <div className="score">
                {score}
                <span>/{quiz.length}</span>
              </div>
              <h3>{site.quiz.complete}</h3>
              <button
                className="text-link"
                onClick={() => {
                  setCurrent(0);
                  setAnswers([]);
                  setFinished(false);
                }}
              >
                {site.quiz.restart}
                <RotateCcw size={18} />
              </button>
            </div>
          ) : (
            <>
              <div className="quiz-progress">
                <span className="meta">
                  CÂU HỎI {String(current + 1).padStart(2, "0")}
                </span>
                <span>
                  {current + 1} / {quiz.length}
                </span>
              </div>
              <progress
                max={quiz.length}
                value={current + 1}
                aria-label="Tiến độ câu hỏi"
              />
              <h3>{q.question}</h3>
              <div className="quiz-choices">
                {q.choices.map((choice, i) => (
                  <button
                    key={choice}
                    disabled={answer !== undefined}
                    className={
                      answer === undefined
                        ? ""
                        : i === q.correctAnswer
                          ? "correct"
                          : answer === i
                            ? "incorrect"
                            : ""
                    }
                    aria-pressed={answer === i}
                    onClick={() => setAnswers([...answers, i])}
                  >
                    <span className="mono">{String.fromCharCode(65 + i)}</span>
                    <span>{choice}</span>
                    {answer !== undefined && i === q.correctAnswer ? (
                      <Check size={18} />
                    ) : answer === i ? (
                      <X size={18} />
                    ) : null}
                  </button>
                ))}
              </div>
              {answer !== undefined && (
                <div className="quiz-feedback" aria-live="polite">
                  <strong>
                    {answer === q.correctAnswer
                      ? "Chính xác."
                      : "Cùng xem lại."}
                  </strong>
                  <p>{q.explanation}</p>
                  <button
                    className="text-link"
                    onClick={() => {
                      if (current === quiz.length - 1) setFinished(true);
                      else setCurrent(current + 1);
                    }}
                  >
                    {current === quiz.length - 1
                      ? site.quiz.finish
                      : site.quiz.next}
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
