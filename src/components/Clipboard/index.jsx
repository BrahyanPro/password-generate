import React from 'react';
import copy from '../../assets/images/copy.png';
import copyw from '../../assets/images/copyw.png';
import './index.css';

export default Clipboard = ({ theme }) => {
  return (
    <div className="tooltip">
      <span className="tooltiptext" id="myTooltip">
        Copiar al Portapapeles
      </span>
      <img
        src={theme === 'dark' ? copyw : copy}
        alt="copy"
        height={25}
        onClick={() => {
          let copyText = document.getElementById('input');
          copyText.select();
          document.execCommand('copy');
          let tooltip = document.getElementById('myTooltip');
          tooltip.innerHTML = 'Copiado';
        }}
        onMouseOut={() => {
          let tooltip = document.getElementById('myTooltip');
          tooltip.innerHTML = 'Copiar al portapapeles';
        }}
      />
    </div>
  );
};
