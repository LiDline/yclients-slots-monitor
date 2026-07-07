import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  getFormattedApplicationLogText,
  getHighlightedApplicationLogNamesAfterLogChange,
  getHighlightedApplicationLogNamesAfterTabClick,
  getVisibleApplicationLogText,
} from './applicationLog.js';

void test('highlights inactive application log tab after log change', () => {
  const highlightedApplicationLogNames = getHighlightedApplicationLogNamesAfterLogChange({
    activeApplicationLogName: 'app',
    changedApplicationLogName: 'error',
    highlightedApplicationLogNames: [],
  });

  assert.deepEqual(highlightedApplicationLogNames, ['error']);
});

void test('does not highlight active application log tab after log change', () => {
  const highlightedApplicationLogNames = getHighlightedApplicationLogNamesAfterLogChange({
    activeApplicationLogName: 'error',
    changedApplicationLogName: 'error',
    highlightedApplicationLogNames: [],
  });

  assert.deepEqual(highlightedApplicationLogNames, []);
});

void test('keeps existing highlighted application log tab after another log change', () => {
  const highlightedApplicationLogNames = getHighlightedApplicationLogNamesAfterLogChange({
    activeApplicationLogName: 'app',
    changedApplicationLogName: 'error',
    highlightedApplicationLogNames: ['error'],
  });

  assert.deepEqual(highlightedApplicationLogNames, ['error']);
});

void test('clears highlighted application log tab after tab click', () => {
  const highlightedApplicationLogNames = getHighlightedApplicationLogNamesAfterTabClick({
    clickedApplicationLogName: 'error',
    highlightedApplicationLogNames: ['error'],
  });

  assert.deepEqual(highlightedApplicationLogNames, []);
});

void test('formats application log text with date time level and message', () => {
  const formattedApplicationLogText = getFormattedApplicationLogText(
    `{"time":${new Date(2026, 6, 7, 15, 40).getTime()},"msg":"Booking opened"}\n`,
  );

  assert.equal(formattedApplicationLogText, '[2026-7-7 15:40] INFO: Booking opened');
});

void test('ignores empty application log lines during formatting', () => {
  const formattedApplicationLogText = getFormattedApplicationLogText('\n\n');

  assert.equal(formattedApplicationLogText, '');
});

void test('shows only new application log text when previous logs are hidden', () => {
  const visibleApplicationLogText = getVisibleApplicationLogText({
    isPreviousApplicationLogTextVisible: false,
    previousApplicationLogText: '{"time":1,"msg":"Previous"}\n',
    receivedApplicationLogText: '{"time":2,"msg":"Received"}\n',
  });

  assert.equal(visibleApplicationLogText, '{"time":2,"msg":"Received"}\n');
});

void test('shows previous and new application log text when previous logs are visible', () => {
  const visibleApplicationLogText = getVisibleApplicationLogText({
    isPreviousApplicationLogTextVisible: true,
    previousApplicationLogText: '{"time":1,"msg":"Previous"}\n',
    receivedApplicationLogText: '{"time":2,"msg":"Received"}\n',
  });

  assert.equal(
    visibleApplicationLogText,
    '{"time":1,"msg":"Previous"}\n{"time":2,"msg":"Received"}\n',
  );
});
