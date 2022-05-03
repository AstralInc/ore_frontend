import React from 'react';
import { createRoot } from 'react-dom/client';
import Button from './components/button';
import { FormGroup, Label, TextArea } from './components/form-control';
import toast, { Toaster } from 'react-hot-toast';
import ToClipboard from './components/copy-to-clipboard';
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from "regenerator-runtime";

const URL = "http://40.83.130.217:3110/";
const CORP = { 
  Image_URL: 'https://images.evetech.net/corporations/98699553/logo?size=64',
  Name: 'Astral Acquisitions Inc.' 
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPending: false,
      buyBackVal: null
    }
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    await this.setStateAsync({isPending: true});

    let response = await fetch(URL, {
      body: this.state.paste,
      headers: {
        "Accept": "application/json",
        "Content-Type": "text/plain"
      },
      method: "POST",
      mode: 'no-cors'
    });

    if (response.ok) {
      this.setState({buyBackVal: await response.json()})
    }
    else
    {
      let error = await response.text();
      toast.error(error !== "" ? error : `An HTTP ${response.status} error has occured.\nPlease try again later`) 
    }
    
    await this.setStateAsync({isPending: false});
  }

  render() {
    const { paste, buyBackVal, isPending } = this.state;

    return (
      <div className='container pt-5'>
          <div className='row'>
            <form className='col-lg-6 col-md-12 pb-5' onSubmit={(e) => this.onSubmit(e)}>
              <FormGroup>
                <Label htmlFor="paste" isRequired>Paste your ore here:</Label>
                <TextArea id='item-dump' placeHolder="Paste ore here...  (Ctrl+V)" rows={6} value={paste} onChange={(paste) => this.setState({paste})} />
                <small className='pb-4'>Click on ore in your inventory and press <kbd>Ctrl</kbd>+<kbd>A</kbd>, <kbd>Ctrl</kbd>+<kbd>C</kbd>.</small>
              </FormGroup>
              
              <Button isPending={isPending}>
                Submit
                <i className="bi bi-chevron-double-right"></i>
              </Button>
            </form>

            <div className='col-lg-6 col-md-12'>
              <div className='row results'>
                <div className='col-auto'>
                  <img className="img-fluid" src={CORP.Image_URL} alt={CORP.Name}/>
                </div>

                <div className='col'>
                  <h5>Contract To:</h5>
                  <p>
                    <ToClipboard>{CORP.Name}</ToClipboard>
                  </p>

                  <h5 className='mb-0'>Buy Back Value:</h5>
                  <small>(I will receive)</small>
                  <p className='pt-2'>
                    { buyBackVal ? (
                      <ToClipboard clipboardVal={buyBackVal}>
                        {buyBackVal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} Isk
                      </ToClipboard>
                    ) : null}
                  </p>
                </div>
              </div>
            </div>

            <small id='tandc'>
              <span className='fw-bold'>Terms and Conditions: </span> Create a private contract with your ore. Use the links (above) to ensure you issue the contract to the correct corporation &amp; that you set the correct value in the &ldquo;I will receive&rdquo; field. Contracts will be accepted within 24 hours.
            </small>
          </div>

          <Toaster 
            position={'top-right'}
            toastOptions={{
              style: {
                  'minWidth': '200px',
              }
            }}
          />
      </div>
    );
  }
}

if (document.getElementById('root')) {
  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(<App />);
}