import ShareBiteLoader from "@/components/ShareBiteLoader";

const LoadingPage = () => {
  return (
    <main className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#f7fbf7] dark:bg-[#050706]">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-[#f8fcf8] via-[#eff8f1] to-[#fbf8ec] dark:from-[#050706] dark:via-[#07120b] dark:to-black" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(16,185,129,0.14),transparent_32%),radial-gradient(circle_at_90%_85%,rgba(132,204,22,0.10),transparent_32%)] dark:bg-[radial-gradient(circle_at_10%_15%,rgba(16,185,129,0.08),transparent_32%),radial-gradient(circle_at_90%_85%,rgba(132,204,22,0.05),transparent_32%)]" />

      <div className="relative">
        <ShareBiteLoader
          mode="page"
          size="lg"
          message="Loading ShareBite"
          subMessage="Please wait while we prepare your food-sharing experience"
        />
      </div>
    </main>
  );
};

export default LoadingPage;
