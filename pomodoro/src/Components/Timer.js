import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Despertador1 from '../Components/Sounds/Despertador1.mp3'
import Despertador2 from '../Components/Sounds/Despertador2.mp3'
import "./Timer.css";


export default function MyTimer({ hoursMinSecs }) {
  const { trabalho, pausa, sessoes } = hoursMinSecs;

  // Para os pontos verdes e amarelos
  const [terminado, setTerminado] = useState(false);
  const [ordem, setOrdem] = useState(1);
  const [marcarVerde, setMarcarVerde] = useState(true);
  const [marcarAmarelo, setMarcarAmarelo] = useState(true);
  const [ordemConcluida, setOrdemConcluida] = useState(1);
  const [sessao, setSessao] = useState([]);

  // ==============================

  // Pausar o cronometro
  const [pause, setPause] = useState(true);

  // Se vai ser Trabalho ou pausa
  const [intervalo, setIntevalo] = useState(false);

  const TEMPO_TRABALHO = trabalho * 60;
  const TEMPO_PAUSA = pausa * 60;

  let [tempoTrabalho, setTempoTrabalho] = useState(TEMPO_TRABALHO);
  let [tempoPausa, setTempoPausa] = useState(TEMPO_PAUSA);
// ------------------------------------------------------


  const starTimer = useCallback(

    (tempo) => {
      setTimeout(() => {
        // Trabalho
        if (!intervalo) {
          if (!pause) {
            if (tempo > 0) {
              setTempoTrabalho((tempo -= 1));
              formataTempo(tempo);
            } else if (tempo === 0) {
              const Despertador = new Audio(Despertador1)
              Despertador.play()
              setPause(true);
              setIntevalo(true);
              setTempoTrabalho(tempoTrabalho + 2);
            }
          } else {
            formataTempo(tempo);
          }
        }

        // Pausa
        else {
          if (!pause) {
            if (tempo > 0) {
              setTempoPausa((tempo -= 1));
              formataTempo(tempo);
            } else if (tempo === 0) {
              const Despertador = new Audio(Despertador1)
              Despertador.play()
              setPause(true);
              setIntevalo(false);
              setTempoPausa(tempoPausa + 2);
            }
          } else {
            formataTempo(tempo);
          }
        }
      }, 1000);
    },
    [intervalo, pause, tempoTrabalho, tempoPausa]
  );

  const checkGreen = useCallback(
    (num) => {
      if (sessao.length === sessoes) {
        if (num > sessao.length) {
          const DespertadorFinal = new Audio(Despertador2)
          DespertadorFinal.play()
          setTerminado(true);
        }
        if (marcarVerde && num <= sessoes) {
          document.getElementById(`session${num}`).style =
            "background-color: #219653;";

          setMarcarVerde(false);
          setMarcarAmarelo(true);
        }
      }
    },
    [sessoes, marcarVerde, sessao.length]
  );
  // =============================================

  const checkYellow = useCallback(
    (num) => {
      if (sessao.length === sessoes) {
        if (marcarAmarelo && num <= sessoes) {
          setMarcarVerde(false);
          document.getElementById(`session${num}`).style =
            "background-color:#F2C94C;";

          console.log(num);
          setOrdemConcluida(num + 1);
          setMarcarAmarelo(false);

          setMarcarVerde(true);
        }
      }
    },
    [marcarAmarelo, sessoes, sessao]
  );

  // =================================

  useEffect(() => {
    if(!terminado){
    if (!intervalo) {
      starTimer(tempoTrabalho);
      checkGreen(ordemConcluida);
    } else {
      starTimer(tempoPausa);
      checkYellow(ordemConcluida);
    }

    // ------------------------------------------
    // Colocando os icones que ficao verde e amarelo
    if (!(sessao.length === sessoes)) {
      setSessao(sessao.concat(ordem));
      setOrdem(ordem + 1);
      //  console.log('ordem'+ordem,'sessao'+ sessoes, sessao)
    }
  }
  }, [
    ordem,
    sessoes,
    pause,
    starTimer,
    tempoPausa,
    tempoTrabalho,
    sessao,
    intervalo,
    checkGreen,
    checkYellow,
    marcarVerde,
    marcarAmarelo,
    ordemConcluida,
    terminado
  ]);

  // ===============================

  const formataTempo = (time) => {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  };

  // ------------------------------------------

  return (
    <div id="Timer">
      {/* Caso o cronometro ainda não esteja encerrado */}
      {!terminado ? (
        <>
          <div id="TimerBox">
            <div id="TimerCamp" className={!intervalo ? "Trabalho" : "Pausa"}>
              <span>
                {" "}
                {formataTempo(!intervalo ? tempoTrabalho : tempoPausa)}
              </span>
            </div>
          </div>
          <div id="TitleButtons">
            <h3 className={!intervalo ? "Trabalho" : "Pausa"}>
              {!intervalo ? "Trabalho" : "Pausa"}
            </h3>
            <div id="Sessoes">
              {sessao.map((i) => (
                <div className="Sessao" id={`session${i}`} key={i}></div>
              ))}
            </div>

            <button id="PlayPause" onClick={() => setPause(!pause)}>
              {!pause ? (
                <i className="fas fa-play"></i>
              ) : (
                <i className="fas fa-pause"></i>
              )}
            </button>
          </div>
        </>
      ) : (
        // Cronometro encerrado
        <div id="Terminado">
          <h2>O tempo acabou!</h2>
          <p>Para voltar ao início clique no botão abaixo</p>
          <Link style={{ textDecoration: "none" }} to="/">
            <button>Início</button>
          </Link>
        </div>
      )}
    </div>
  );
}
