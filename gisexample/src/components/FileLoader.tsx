import React, { useState } from 'react';
import pako from 'pako';

const FileLoader: React.FC = () => {
  const [data, setData] = useState<number[][][]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setError('Файл не выбран');
      return;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const decompressedData = pako.inflate(uint8Array, { to: 'string' });

      // Парсим JSON и сохраняем в переменную data
      const jsonData: number[][][] = JSON.parse(decompressedData);
      setData(jsonData);
      setError(null);
    } catch (err) {
      setError('Ошибка при обработке файла: ' + (err as Error).message);
    }
  };

  return (
    <div>
      <input type="file" accept=".json.gz" onChange={handleFileChange} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {data.length > 0 && (
        <div>
          <h3>Данные:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FileLoader;
