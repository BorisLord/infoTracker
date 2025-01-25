export const InfoBox = ({ title, data }) => {
  return (
    <div className="p-6 rounded-md border border-green-500 w-full">
      <h1 className="text-xl font-bold mb-4 text-green-400">{title}</h1>
      <pre className="font-mono whitespace-pre-wrap">
        {data && typeof data === "object" ? (
          Object.entries(data).map(([key, value]) => (
            <div key={key}>
              {key} : {JSON.stringify(value, null, 2) || "N/A"}
            </div>
          ))
        ) : (
          <div>No data available</div>
        )}
      </pre>
    </div>
  );
};
