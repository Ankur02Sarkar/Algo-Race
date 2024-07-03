// src/components/SortingVisualizer.js

import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const BarsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const Bar = styled.div`
  width: 1.5rem;
  height: ${({ height }) => height / 2}px;
  background-color: ${({ active, sorted }) =>
    sorted ? "green" : active ? "red" : "blue"};
  margin: 0 2px;
  position: relative;
`;

const ValueLabel = styled.div`
  position: absolute;
  top: -20px;
  width: 100%;
  text-align: center;
  color: white;
`;

const TimeLabel = styled.div`
  margin-top: 20px;
  font-size: 18px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const generateRandomArray = (size) => {
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * 400) + 20
  );
};

const SortingVisualizer = ({
  algorithm,
  speed,
  startSortingSignal,
  onSortingComplete,
}) => {
  const [array, setArray] = useState([]);
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    setArray(generateRandomArray(10));
  }, []);

  useEffect(() => {
    if (startSortingSignal) {
      startSorting();
    }
  }, [startSortingSignal]);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const bubbleSort = async (arr) => {
    let tempArr = [...arr];
    const startTime = performance.now();
    for (let i = 0; i < tempArr.length; i++) {
      for (let j = 0; j < tempArr.length - i - 1; j++) {
        setActiveIndices([j, j + 1]);
        if (tempArr[j] > tempArr[j + 1]) {
          [tempArr[j], tempArr[j + 1]] = [tempArr[j + 1], tempArr[j]];
        }
        setArray([...tempArr]);
        await sleep(100 / speed);
      }
      setSortedIndices((indices) => [...indices, tempArr.length - i - 1]);
    }
    setActiveIndices([]);
    const endTime = performance.now();
    setTime(((endTime - startTime) / 1000).toFixed(2));
    onSortingComplete();
  };

  const insertionSort = async (arr) => {
    let tempArr = [...arr];
    const startTime = performance.now();
    for (let i = 1; i < tempArr.length; i++) {
      let key = tempArr[i];
      let j = i - 1;
      while (j >= 0 && tempArr[j] > key) {
        setActiveIndices([j, j + 1]);
        tempArr[j + 1] = tempArr[j];
        j = j - 1;
        setArray([...tempArr]);
        await sleep(100 / speed);
      }
      tempArr[j + 1] = key;
      setArray([...tempArr]);
      setSortedIndices((indices) => [...indices, i]);
    }
    setSortedIndices((indices) => [...indices, 0]); // Ensure the first element is marked as sorted
    setActiveIndices([]);
    const endTime = performance.now();
    setTime(((endTime - startTime) / 1000).toFixed(2));
    onSortingComplete();
  };

  const quickSort = async (arr, low = 0, high = arr.length - 1) => {
    const startTime = performance.now();
    const partition = async (arr, low, high) => {
      let pivot = arr[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        setActiveIndices([j, high]);
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        setArray([...arr]);
        await sleep(100 / speed);
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      setArray([...arr]);
      await sleep(100 / speed);
      return i + 1;
    };

    if (low < high) {
      let pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
    if (low === 0 && high === arr.length - 1) {
      setSortedIndices(Array.from({ length: arr.length }, (_, i) => i)); // Ensure all elements are marked as sorted
      setActiveIndices([]);
      const endTime = performance.now();
      setTime(((endTime - startTime) / 1000).toFixed(2));
      onSortingComplete();
    }
  };

  const selectionSort = async (arr) => {
    let tempArr = [...arr];
    const startTime = performance.now();
    for (let i = 0; i < tempArr.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < tempArr.length; j++) {
        setActiveIndices([i, j]);
        if (tempArr[j] < tempArr[minIdx]) {
          minIdx = j;
        }
        await sleep(100 / speed);
      }
      [tempArr[i], tempArr[minIdx]] = [tempArr[minIdx], tempArr[i]];
      setArray([...tempArr]);
      setSortedIndices((indices) => [...indices, i]);
    }
    setActiveIndices([]);
    const endTime = performance.now();
    setTime(((endTime - startTime) / 1000).toFixed(2));
    onSortingComplete();
  };

  const combSort = async (arr) => {
    let tempArr = [...arr];
    const startTime = performance.now();
    let gap = tempArr.length;
    let swapped = true;

    while (gap !== 1 || swapped) {
      gap = Math.floor(gap / 1.3);
      if (gap < 1) gap = 1;
      swapped = false;

      for (let i = 0; i < tempArr.length - gap; i++) {
        setActiveIndices([i, i + gap]);
        if (tempArr[i] > tempArr[i + gap]) {
          [tempArr[i], tempArr[i + gap]] = [tempArr[i + gap], tempArr[i]];
          swapped = true;
        }
        setArray([...tempArr]);
        await sleep(100 / speed);
      }
    }
    setSortedIndices(Array.from({ length: tempArr.length }, (_, i) => i));
    setActiveIndices([]);
    const endTime = performance.now();
    setTime(((endTime - startTime) / 1000).toFixed(2));
    onSortingComplete();
  };

  const bogoSort = async (arr) => {
    let tempArr = [...arr];
    const startTime = performance.now();

    const isSorted = (arr) => {
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
          return false;
        }
      }
      return true;
    };

    while (!isSorted(tempArr)) {
      for (let i = tempArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tempArr[i], tempArr[j]] = [tempArr[j], tempArr[i]];
      }
      setArray([...tempArr]);
      await sleep(100 / speed);
    }
    setSortedIndices(Array.from({ length: tempArr.length }, (_, i) => i));
    setActiveIndices([]);
    const endTime = performance.now();
    setTime(((endTime - startTime) / 1000).toFixed(2));
    onSortingComplete();
  };

  const bucketSort = async (arr) => {
    let tempArr = [...arr];
    const startTime = performance.now();

    const bucketSortHelper = (arr, size = 5) => {
      if (arr.length === 0) return arr;

      let i,
        minValue = arr[0],
        maxValue = arr[0],
        bucketSize = size;

      arr.forEach((currentVal) => {
        if (currentVal < minValue) minValue = currentVal;
        else if (currentVal > maxValue) maxValue = currentVal;
      });

      let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
      let allBuckets = new Array(bucketCount);

      for (i = 0; i < allBuckets.length; i++) {
        allBuckets[i] = [];
      }

      arr.forEach((currentVal) => {
        allBuckets[Math.floor((currentVal - minValue) / bucketSize)].push(
          currentVal
        );
      });

      arr.length = 0;

      allBuckets.forEach((bucket) => {
        insertionSort(bucket);
        bucket.forEach((element) => {
          arr.push(element);
        });
      });

      return arr;
    };

    tempArr = bucketSortHelper(tempArr);
    setArray([...tempArr]);
    setSortedIndices(Array.from({ length: tempArr.length }, (_, i) => i));
    setActiveIndices([]);
    const endTime = performance.now();
    setTime(((endTime - startTime) / 1000).toFixed(2));
    onSortingComplete();
  };

  const mergeSort = async (arr) => {
    const startTime = performance.now();
    const mergeSortHelper = async (arr, l, r) => {
      if (l >= r) {
        return;
      }
      const m = Math.floor((l + r) / 2);
      await mergeSortHelper(arr, l, m);
      await mergeSortHelper(arr, m + 1, r);
      await merge(arr, l, m, r);
    };

    const merge = async (arr, l, m, r) => {
      const n1 = m - l + 1;
      const n2 = r - m;
      const left = new Array(n1);
      const right = new Array(n2);

      for (let i = 0; i < n1; i++) {
        left[i] = arr[l + i];
      }
      for (let j = 0; j < n2; j++) {
        right[j] = arr[m + 1 + j];
      }

      let i = 0,
        j = 0,
        k = l;
      while (i < n1 && j < n2) {
        setActiveIndices([k]);
        if (left[i] <= right[j]) {
          arr[k] = left[i];
          i++;
        } else {
          arr[k] = right[j];
          j++;
        }
        k++;
        setArray([...arr]);
        await sleep(100 / speed);
      }

      while (i < n1) {
        arr[k] = left[i];
        i++;
        k++;
        setActiveIndices([k]);
        setArray([...arr]);
        await sleep(100 / speed);
      }

      while (j < n2) {
        arr[k] = right[j];
        j++;
        k++;
        setActiveIndices([k]);
        setArray([...arr]);
        await sleep(100 / speed);
      }
    };

    await mergeSortHelper(arr, 0, arr.length - 1);
    setSortedIndices(Array.from({ length: arr.length }, (_, i) => i));
    setActiveIndices([]);
    const endTime = performance.now();
    setTime(((endTime - startTime) / 1000).toFixed(2));
    onSortingComplete();
  };

  const heapSort = async (arr) => {
    const startTime = performance.now();
    const n = arr.length;

    const heapify = async (arr, n, i) => {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < n && arr[left] > arr[largest]) {
        largest = left;
      }

      if (right < n && arr[right] > arr[largest]) {
        largest = right;
      }

      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        setArray([...arr]);
        setActiveIndices([i, largest]);
        await sleep(100 / speed);
        await heapify(arr, n, largest);
      }
    };

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      setArray([...arr]);
      setActiveIndices([0, i]);
      await sleep(100 / speed);
      await heapify(arr, i, 0);
      setSortedIndices((indices) => [...indices, i]);
    }

    setSortedIndices((indices) => [...indices, 0]);
    setActiveIndices([]);
    const endTime = performance.now();
    setTime(((endTime - startTime) / 1000).toFixed(2));
    onSortingComplete();
  };

  const cocktailSort = async (arr) => {
    let tempArr = [...arr];
    const startTime = performance.now();
    let swapped = true;
    let start = 0;
    let end = tempArr.length;

    while (swapped) {
      swapped = false;

      for (let i = start; i < end - 1; ++i) {
        setActiveIndices([i, i + 1]);
        if (tempArr[i] > tempArr[i + 1]) {
          [tempArr[i], tempArr[i + 1]] = [tempArr[i + 1], tempArr[i]];
          swapped = true;
        }
        setArray([...tempArr]);
        await sleep(100 / speed);
      }

      if (!swapped) break;

      swapped = false;
      end = end - 1;

      for (let i = end - 1; i >= start; i--) {
        setActiveIndices([i, i + 1]);
        if (tempArr[i] > tempArr[i + 1]) {
          [tempArr[i], tempArr[i + 1]] = [tempArr[i + 1], tempArr[i]];
          swapped = true;
        }
        setArray([...tempArr]);
        await sleep(100 / speed);
      }

      start = start + 1;
    }
    setSortedIndices(Array.from({ length: tempArr.length }, (_, i) => i));
    setActiveIndices([]);
    const endTime = performance.now();
    setTime(((endTime - startTime) / 1000).toFixed(2));
    onSortingComplete();
  };

  const shellSort = async (arr) => {
    let tempArr = [...arr];
    const startTime = performance.now();
    const n = tempArr.length;

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < n; i++) {
        let temp = tempArr[i];
        let j;
        for (j = i; j >= gap && tempArr[j - gap] > temp; j -= gap) {
          setActiveIndices([j, j - gap]);
          tempArr[j] = tempArr[j - gap];
          setArray([...tempArr]);
          await sleep(100 / speed);
        }
        tempArr[j] = temp;
        setArray([...tempArr]);
        await sleep(100 / speed);
      }
    }

    setSortedIndices(Array.from({ length: tempArr.length }, (_, i) => i));
    setActiveIndices([]);
    const endTime = performance.now();
    setTime(((endTime - startTime) / 1000).toFixed(2));
    onSortingComplete();
  };

  const startSorting = () => {
    setTime(0);
    setSortedIndices([]);
    if (algorithm === "bubbleSort") {
      bubbleSort(array);
    } else if (algorithm === "insertionSort") {
      insertionSort(array);
    } else if (algorithm === "quickSort") {
      quickSort(array);
    } else if (algorithm === "selectionSort") {
      selectionSort(array);
    } else if (algorithm === "combSort") {
      combSort(array);
    } else if (algorithm === "bogoSort") {
      bogoSort(array);
    } else if (algorithm === "bucketSort") {
      bucketSort(array);
    } else if (algorithm === "mergeSort") {
      mergeSort(array);
    } else if (algorithm === "heapSort") {
      heapSort(array);
    } else if (algorithm === "cocktailSort") {
      cocktailSort(array);
    } else if (algorithm === "shellSort") {
      shellSort(array);
    }
  };

  return (
    <Container>
      <Title>{algorithm}</Title>
      <BarsContainer>
        {array.map((value, index) => (
          <Bar
            key={index}
            height={value}
            active={activeIndices.includes(index)}
            sorted={sortedIndices.includes(index)}
          >
            <ValueLabel>{value}</ValueLabel>
          </Bar>
        ))}
      </BarsContainer>
      <TimeLabel>Time taken: {time} seconds</TimeLabel>
    </Container>
  );
};

export default SortingVisualizer;
