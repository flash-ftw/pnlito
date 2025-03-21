'use client';

export default function Home() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const wallet = e.target.wallet.value;
    console.log('Wallet address:', wallet);
    // We'll implement the analysis logic later
  };

  return (
    <main style={{ 
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      textAlign: 'center' 
    }}>
      <h1 style={{ 
        fontSize: '2rem',
        marginBottom: '1rem' 
      }}>
        NFT Portfolio Analyzer
      </h1>
      <p style={{ marginBottom: '2rem' }}>
        Enter your wallet address to analyze your NFT portfolio
      </p>

      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '400px',
        margin: '0 auto'
      }}>
        <input
          type="text"
          name="wallet"
          placeholder="Enter your wallet address"
          required
          style={{
            padding: '0.5rem',
            fontSize: '1rem',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Analyze Portfolio
        </button>
      </form>
    </main>
  );
} 