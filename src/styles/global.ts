import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  :root {
    --background: #f0f2f5;
    --shape: #ffffff;

    --red: #e52e40;
    --green: #33cc95;
    --purple: #5429cc;

    --purple-light: #6933ff;

    --text-title: #363f5f;
    --text-body: #969cb3;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  // default font-size: 16px
  html {
    @media (max-width: 1080px) {
      font-size: 93.75%; // 15px
    }

    @media (max-width: 720px) {
      font-size: 87.5%; // 14px

      #headerContent {
        display: flex;
        flex-direction: column;
        padding: 2rem 1rem 31rem;
        gap: 20px;

        button {
          width: 100%;
        }
      }

      #summaryContainer {
        margin-top: -32rem;
      }

      #summaryContainer {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      #transactionsContainer {
        margin-top: 2rem;
      }

      #optionIcons {
        padding: 0 15px !important;
      }

      
    }
  }

  // REM = 1rem = font-size

  body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  [disable] {
    opacity: .6;
    cursor: not-allowed;
  }

  .react-modal-overlay {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .react-modal-content {
    width: 100%;
    max-width: 576px;

    background: var(--background);
    padding: 3rem;
    position: relative;

    border-radius: .25rem;
  }

  .react-modal-close {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    border: 0;
    background: transparent;

    transition: .2s;

    &:hover {
      filter: brightness(.8);
    }
  }

`;
