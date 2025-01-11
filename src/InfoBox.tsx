interface InfoBoxProps {
  title: string;
  data: Record<
    string,
    string | number | undefined | null | Intl.ResolvedDateTimeFormatOptions
  >;
}

export const InfoBox: React.FC<InfoBoxProps> = ({ title, data }) => {
  return (
    <div className="p-6 rounded-md border border-green-500">
      <h1 className="text-xl font-bold mb-4 text-green-400">{title}</h1>
      <pre className="font-mono whitespace-pre-wrap">
        {Object.entries(data).map(([key, value]) => (
          <div key={key}>
            {key} : {JSON.stringify(value, null, 2)}
          </div>
        ))}
      </pre>
    </div>
  );
};
