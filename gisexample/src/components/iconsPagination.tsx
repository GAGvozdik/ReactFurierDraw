import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationSize() {
  return (
    <Stack spacing={16}>
      <Pagination count={10} size="large" defaultPage={1} siblingCount={0} boundaryCount={0}/>
    </Stack>
  );
}