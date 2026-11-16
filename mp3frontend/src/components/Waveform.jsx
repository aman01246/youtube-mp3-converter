function Waveform() {
  const waveform = [
    20, 35, 55, 30, 70, 42, 85, 50, 65,
    32, 75, 45, 90, 52, 35, 68, 42, 78,
    30, 58, 38, 72, 45, 25, 60, 35, 50,
    30, 58, 38, 72, 45, 25, 60, 35, 30
  ];

  return (
    <div className="waveform">
      {waveform.map((height, index) => (
        <span
          key={index}
          style={{
            height: `${height}%`,
            animationDelay: `${index * 0.05}s`
          }}
        ></span>
      ))}
    </div>
  );
}

export default Waveform;
