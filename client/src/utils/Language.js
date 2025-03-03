import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { php } from '@codemirror/lang-php';

export const languageExtensions = {
  javascript: javascript(),
  python: python(),
  java: java(),
  c: cpp(),   // Use cpp() for C
  cpp: cpp(),
  php: php(),
};
