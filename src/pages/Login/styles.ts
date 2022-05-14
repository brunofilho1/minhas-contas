import styled from "styled-components";

export const Container = styled.header`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: rgb(51, 204, 149);
  background: -moz-linear-gradient(
    344deg,
    rgba(51, 204, 149, 1) 18%,
    rgba(105, 51, 255, 1) 81%
  );
  background: -webkit-linear-gradient(
    344deg,
    rgba(51, 204, 149, 1) 18%,
    rgba(105, 51, 255, 1) 81%
  );
  background: linear-gradient(
    344deg,
    rgba(51, 204, 149, 1) 18%,
    rgba(105, 51, 255, 1) 81%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#33cc95",endColorstr="#6933ff",GradientType=1);

  #loginForm {
    width: 400px;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 2rem;

    background: var(--background);
    border-radius: 0.25rem;

    #loginHeader {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 2rem;

      img {
        width: 250px;
      }

      span {
        color: var(--text-body);
      }
    }

    #loginBody {
      margin-bottom: 1rem;

      input {
        width: 100%;
        padding: 0 1.5rem;
        height: 4rem;

        border: 1px solid #d7d7d7;
        border-radius: 0.25rem;
        background: #e7e9ee;

        font-weight: 400;

        &::placeholder {
          color: var(--text-body);
        }

        // todo input a partir do segundo...
        & + input {
          margin-top: 1rem;
        }
      }

      button[type="submit"] {
        width: 100%;
        padding: 0 1.5rem;
        height: 4rem;

        background: var(--green);
        color: #fff;

        border-radius: 0.25rem;
        border: 0;
        font-size: 1rem;
        font-weight: 600;
        margin-top: 1.5rem;

        transition: 0.2s;

        &:hover {
          filter: brightness(0.9);
        }
      }
    }

    a#registerBtn {
      text-decoration: none;
      font-size: 0.85rem;
      color: var(--text-body);

      &:hover {
        transition: 0.2s;
        color: #7d859f;
      }
    }
  }
`;
