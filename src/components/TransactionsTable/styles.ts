import styled from "styled-components";

export const Container = styled.div`
  margin-top: 4rem;
  overflow-x: auto;

  #noResultsAnimation {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20vh;

    img {
      width: 100px;
      animation: cactusAnimation 3s infinite;
    }

    @keyframes cactusAnimation {
      0%,
      20%,
      50%,
      80%,
      100% {
        transform: translateY(0) scale(0.9, 1.1);
      }
      40% {
        transform: translateY(-30px) scale(1.1, 0.9);
      }
      60% {
        transform: translateY(-15px);
      }
    }
  }

  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    th {
      color: var(--text-body);
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
    }

    td#optionIcons {
      padding: 0 5px;

      svg {
        cursor: pointer;
        font-size: 20px;
        transition: 0.2s;

        &:hover {
          color: var(--purple);
        }
      }
    }

    td {
      padding: 1rem 2rem;
      border: none;
      background: var(--shape);
      color: var(--text-body);
      border-radius: 0.25rem;

      &:first-child {
        color: var(--text-title);
      }

      &.deposit {
        color: var(--green);
      }
      &.withdraw {
        color: var(--red);
      }
    }
  }
`;
