import "../Styles/Inicio.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Inicio() {
  const [trabalho, setTrabalho] = useState(25);
  const [pausa, setPausa] = useState(5);
  const [sessoes, setSessoes] = useState(3);

  const Data = {
    trabalho,
    pausa,
    sessoes,
  };
  useEffect(() => {
    if (trabalho > 60) {
      setTrabalho(60);
    } else if (trabalho < 1) {
      setTrabalho(1);
    }
    if (pausa > 60) {
      setPausa(60);
    } else if (pausa < 1) {
      setPausa(1);
    }
    if (sessoes > 10) {
      setSessoes(10);
    } else if (sessoes < 1) {
      setSessoes(1);
    }
  }, [sessoes, pausa, trabalho]);
  return (
    <div id="Inicio">
      <h1 id="Title">Pomodoro</h1>

      <div id="Buttons">
        {/* Buttons */}

        <div id="Work_Interval">
          <div id="box-1" className="Box">
            {/* Box 1 */}
            <div className="Element">
              <div className="Options">
                <i
                  onClick={() => {
                    setTrabalho(trabalho + 1);
                  }}
                  className="fas fa-arrow-alt-circle-up"
                ></i>
                <i
                  onClick={() => {
                    setTrabalho(trabalho - 1);
                  }}
                  className="fas fa-arrow-alt-circle-down"
                ></i>
              </div>
              <div className="Time">
                <div className="Button">{trabalho}</div>
                <p>Trabalho</p>
              </div>
            </div>
          </div>

          {/* =========================== */}

          <div id="box-2" className="Box">
            {/* Box 2 */}
            <div className="Element">
              <div className="Options">
                <i
                  onClick={() => {
                    setPausa(pausa + 1);
                  }}
                  className="fas fa-arrow-alt-circle-up"
                ></i>
                <i
                  onClick={() => {
                    setPausa(pausa - 1);
                  }}
                  className="fas fa-arrow-alt-circle-down"
                ></i>
              </div>
              <div className="Time">
                <div className="Button">{pausa}</div>
                <p>Pausa</p>
              </div>
            </div>
          </div>
        </div>
        {/* ========================= */}

        <div id="box-3" className="Box">
          {/* Box 3 */}
          <div className="Element">
            <div className="Options">
              <i onClick={() => {
                  setSessoes(sessoes + 1);
                }}
                className="fas fa-arrow-alt-circle-up"
              ></i>
              <i onClick={() => {
                  setSessoes(sessoes - 1);
                }}
                className="fas fa-arrow-alt-circle-down"
              ></i>
            </div>
            <div className="Time">
              <div className="Button">{sessoes}</div>
              <p>Sessões</p>
            </div>
          </div>
        </div>

        {/* ============================= */}
      </div>
      <Link
        style={{ textDecoration: "none" }}
        to={"/pomodoro"}
        state={{ state: Data }}
      >
        {" "}
        <button id="Continuar">Continuar</button>
      </Link>
    </div>
  );
}
