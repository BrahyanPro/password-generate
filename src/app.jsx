import React, { useState, useEffect, useReducer } from 'react';
import Toggle from './components/Toogle';
import sun from './assets/images/sun.png';
import moon from './assets/images/moon.png';
import Clipboard from './components/Clipboard';
import { RandomPassword } from './utils/RandomPassword';
const root = document.documentElement;
const theme = {
  light: {
    font: '#222225',
    background: '#ffffff',
  },
  dark: {
    font: '#ffc300',
    background: '#001d3d',
  },
};

let initialState = {
  length: 8,
  newLength: 8,
  pwd: '',
  theme: 'light',
  typing: false,
  typingTimeout: 0,
};

let init = {
  numeric: true,
  mayus: true,
  minus: true,
  simbol: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'minus':
      return { ...state, minus: !state.minus };
    case 'mayus':
      return { ...state, mayus: !state.mayus };
    case 'numeric':
      return { ...state, numeric: !state.numeric };
    case 'simbol':
      return { ...state, simbol: !state.simbol };
    default:
      throw new Error();
  }
};

export const GenerateApp = () => {
  const [state, setState] = useState(initialState);

  const [estado, dispatch] = useReducer(reducer, init);
  useEffect(() => {
    generatePwd();
  }, [estado, state.length]);

  const generatePwd = () => {
    const { length } = state;
    let pwd = new RandomPassword()
      .setLength(length)
      .setLowerCase(estado.minus)
      .setUpperCase(estado.mayus)
      .setNumberCase(estado.numeric)
      .setSymbol(estado.simbol)
      .generate();
    setState({ ...state, pwd });
  };

  const handleLenghtChange = ({ target: { value } }) => {
    if (value >= 40) {
      value = 40;
    }
    setState(
      {
        ...state,
        length: value,
      },
      () => generatePwd()
    );
  };
  const changeTheme = (e) => {
    setState({ ...state, theme: e.target.checked ? 'light' : 'dark' });
    console.log(e.target.checked);
    root.style.setProperty('--background-color', theme[state.theme].background);
    root.style.setProperty('--font-color', theme[state.theme].font);
  };
  return (
    <div>
      <div className="container" style={{ marginTop: 20 }}>
        <section>
          <header>
            <div className="row">
              <div className="col">
                <h1 className=" terminal-prompt">
                  Generador de Contraseñas en Preact
                </h1>
              </div>
              <div className="col">
                <div className="switch">
                  <Toggle
                    icons={{
                      checked: (
                        <img
                          src={moon}
                          width="16"
                          height="16"
                          role="presentation"
                          alt="dark"
                          style={{ pointerEvents: 'none' }}
                        />
                      ),
                      unchecked: (
                        <img
                          src={sun}
                          width="16"
                          height="16"
                          role="presentation"
                          alt="light"
                          style={{ pointerEvents: 'none' }}
                        />
                      ),
                    }}
                    checked={state.theme === 'light'}
                    onChange={changeTheme}
                  />
                </div>
              </div>
            </div>
          </header>
          <div className="input-container">
            <input
              id="input"
              className={state.theme}
              name="password"
              type="text"
              readOnly
              value={state.pwd}
            />
            <div className="clipboard">
              <Clipboard theme={state.theme} />
            </div>
          </div>
        </section>
        <hr />
        <section>
          <header>
            <h3>Personalize Su Contraseña</h3>
          </header>
          <fieldset>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label className="checkbox-container">
                    Mayusculas
                    <input
                      type="checkbox"
                      checked={estado.mayus}
                      name="upperCase"
                      onChange={() => dispatch({ type: 'mayus' })}
                    />
                    <span className="checkmark" />
                  </label>
                  <label className="checkbox-container">
                    Minusculas
                    <input
                      type="checkbox"
                      checked={estado.minus}
                      name="lowerCase"
                      onChange={() => dispatch({ type: 'minus' })}
                    />
                    <span className="checkmark" />
                  </label>
                  <label className="checkbox-container">
                    Numeros
                    <input
                      type="checkbox"
                      checked={estado.numeric}
                      name="numeric"
                      onChange={() => dispatch({ type: 'numeric' })}
                    />
                    <span className="checkmark" />
                  </label>
                  <label className="checkbox-container">
                    Simbolos
                    <input
                      type="checkbox"
                      checked={estado.sissmbol}
                      name="symbol"
                      onChange={() => dispatch({ type: 'simbol' })}
                    />
                    <span className="checkmark" />
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <label htmlFor="email">Tamaño de Contraseña</label>
                      &nbsp;&nbsp;
                    </div>
                    <div className="col">
                      <input
                        type="number"
                        min="8"
                        max="40"
                        style={{ width: 65 }}
                        value={state.length}
                        onChange={handleLenghtChange}
                      />
                    </div>
                  </div>
                  &nbsp;
                  <div className="slider-container">
                    <input
                      className="slider"
                      type="range"
                      min="8"
                      max="40"
                      value={state.length}
                      onChange={handleLenghtChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
          <br />
          <div style={{ textAlign: 'left' }}>
            <div className="row">
              <div className="col">
                <button
                  className="btn  btn-primary"
                  onClick={() => {
                    generatePwd();
                  }}
                >
                  Generar
                </button>
              </div>
            </div>
            <br />
            <br />
          </div>
        </section>
        <div
          style={{
            textAlign: 'center',
          }}
        >
          Made with <span style={{ color: '#e25555' }}>&#9829;</span> by{' '}
          <a href="https://github.com/BrahyanPro">Brahyan Pro</a>
        </div>
      </div>
    </div>
  );
};
