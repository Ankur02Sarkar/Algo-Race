"use client";
import React from "react";
import styled from "styled-components";
import SortingVisualizer from "./SortingVisualizer";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VisualizerContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const Title = styled.h1`
  margin: 20px;
`;

const MainPage = () => {
  return (
    <PageContainer>
      <Title>Sorting Visualizer</Title>
      <VisualizerContainer>
        <SortingVisualizer algorithm="bubbleSort" />
        {/* Add more SortingVisualizer components here with different algorithms */}
      </VisualizerContainer>
    </PageContainer>
  );
};

export default MainPage;
