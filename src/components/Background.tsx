const Background = () => (
  <div className="absolute inset-0 bg-white dark:bg-gray-950 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950" />
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
          linear-gradient(to right, rgba(226, 232, 240, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(226, 232, 240, 0.1) 1px, transparent 1px)
        `,
          backgroundSize: "80px 80px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
          linear-gradient(to right, rgba(226, 232, 240, 0.2) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(226, 232, 240, 0.2) 1px, transparent 1px)
        `,
          backgroundSize: "20px 20px",
        }}
      />
    </div>
    <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-tl from-blue-100/20 to-transparent dark:from-blue-900/10 dark:to-transparent" />
  </div>
);

export default Background;
