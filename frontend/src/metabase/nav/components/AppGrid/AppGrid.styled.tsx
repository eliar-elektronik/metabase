import styled from "@emotion/styled";

import { color } from "metabase/lib/colors";

export const AppGridButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.375rem;
  color: ${color("text-medium")};
  background: transparent;
  border: none;

  &:hover {
    color: ${color("brand")};
  }
`;

export const AppGridDropdown = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.25rem;
`;

export const AppGridItemButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1.25rem;
  border-radius: 0.5rem;
  text-decoration: none;
  color: ${color("text-dark")};

  &:hover {
    background-color: ${color("bg-light")};
    color: ${color("text-dark")};
  }
`;

export const AppGridContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  max-width: 5rem;
`;

export const AppGridItemImage = styled.img`
  width: 2rem;
  height: 2rem;
  object-fit: contain;
`;

export const AppGridItemLabel = styled.div`
  font-size: 0.75rem;
  line-height: 1rem;
  text-align: center;
  white-space: normal;
  word-break: break-word;
`;
