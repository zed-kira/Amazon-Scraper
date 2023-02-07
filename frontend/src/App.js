

// Internal Components
import Dashboard from './scenes/dashboard';

// Custom CSS
import './App.css';

// Tremor CSS (should be the last CSS file)
import '@tremor/react/dist/esm/tremor.css';

function App() {
  return (
    <>
      <section>
          <div className="container" style={{ marginTop: 55 }}>
            <Dashboard />
          </div>
      </section>
    </>
  );
}

{/* <div class="row">
    <div class="col text-end">
      
    </div>
    <div class="col">
      
    </div>
</div> */}

export default App;
