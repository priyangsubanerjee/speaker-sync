class GainProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      { name: "inputGain", defaultValue: 1.0, minValue: 0, maxValue: 2 },
      { name: "outputGain", defaultValue: 1.0, minValue: 0, maxValue: 2 },
    ];
  }

  constructor() {
    super();
    this.port.postMessage({ message: "GainProcessor created" });
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];
    const inputGain = parameters.inputGain.length > 0 ? parameters.inputGain[0] : 1.0;
    const outputGain = parameters.outputGain.length > 0 ? parameters.outputGain[0] : 1.0;

    for (let channel = 0; channel < input.length; channel++) {
      const inputChannel = input[channel];
      const outputChannel = output[channel];

      for (let i = 0; i < inputChannel.length; i++) {
        outputChannel[i] = inputChannel[i] * inputGain * outputGain;
      }
    }

    return true;
  }
}

registerProcessor("gain-processor", GainProcessor);
