import React, { useEffect, useState } from "react";

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error en fetch:", err);
        setFetchError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Cargando datos...</p>;
  if (fetchError) return <p style={{ color: "red", padding: 20 }}>❌ Error: {fetchError}</p>;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>🧠 Resultados Visuales de las 3 APIs</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center" }}>
        {results.map((item, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ccc",
              borderRadius: 10,
              padding: 20,
              width: 300,
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              backgroundColor: "#fafafa"
            }}
          >
            <h3>API {i + 1}</h3>
            <p><strong>Origen:</strong> {item.api}</p>

            {item.error ? (
              <p style={{ color: "red" }}>❌ {item.error}</p>
            ) : (
              <>
                {i === 0 && item.data.name && (
                  <p>🔬 Pokémon: <strong>{item.data.name.toUpperCase()}</strong></p>
                )}

                {i === 1 && item.data.title && (
                  <>
                    <p>📰 Post:</p>
                    <p style={{ fontStyle: "italic" }}>{item.data.title}</p>
                  </>
                )}

                {i === 2 && item.data.temperature && (
                  <div>
                    <p>🌤️ Clima en Londres:</p>
                    <p><strong>Temperatura:</strong> {item.data.temperature}</p>
                    <p><strong>Viento:</strong> {item.data.wind}</p>
                    <p><strong>Descripción:</strong> {item.data.description}</p>
                  </div>
                )}

                {i === 3 && item.data.message && (
                  <div>
                    <p>🐶 Imagen aleatoria de perro:</p>
                    <img
                      src={item.data.message}
                      alt="Perro"
                      style={{ maxWidth: "100%", borderRadius: 10 }}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
