import { Box, CircularProgress, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { DynamicTable } from "./DynamicTable";

import { supabase } from "../config/supabase";
import { TestData } from "../types/test";
import { CreateEntryForm } from "./CreateEntryForm";

const ProtectedTestData = () => {
  const [data, setData] = useState<TestData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProtectedData = async () => {
    try {
        const { data: protectedData, error } = await supabase
        .from("protected_data")
        .select("*")
        if(error) throw error;
        setData(protectedData);
    } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
    }finally{
        setLoading(false);
    }
}

useEffect(() => {
    fetchProtectedData();
}, [])

if (loading) return <CircularProgress />;
if (error) return <Typography color="error">{error}</Typography>;

return (
    <Box sx={{ p: 3 }}>
       <Typography variant="h2" gutterBottom>
        Protected Test Data
        </Typography>
        <CreateEntryForm onSuccess={fetchProtectedData}/>
        {data?.length > 0 ? (
            <DynamicTable data={data} />
        ) : (
            <Typography variant="body1">No data found. Please create some</Typography>
        )}

    </Box>
  );
};

export default ProtectedTestData;
