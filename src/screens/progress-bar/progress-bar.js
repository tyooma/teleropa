import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: ''
    }
  }

  componentDidMount() {
    this.setState({
      step: this.props.step
    })
  }

  render() {
    console.log("STEP (progress-bar.js): ", this.state.step)
    switch (this.state.step) {
      case 'cart':
        return (
          <View style={styles.progressBar}>
            <View style={styles.progressBarItem}>
              <View style={styles.progressBarCircleCurrent}>
                <Text style={styles.progressBarNumberCurrent}>
                  1
                </Text>
              </View>
              <Text style={styles.progressBarTextCurrent}>
                Warenkorb
              </Text>
            </View>
            <View style={styles.progressBarLineCurrent} />
            <View style={styles.progressBarItem}>
              <View style={styles.progressBarCircleDisabled}>
                <Text style={styles.progressBarNumberDisabled}>
                  2
                </Text>
              </View>
              <Text style={styles.progressBarTextDisabled}>
                Login/Gast
              </Text>
            </View>
            <View style={styles.progressBarLineDisabled} />
            <View style={styles.progressBarItem}>
              <View style={styles.progressBarCircleDisabled}>
                <Text style={styles.progressBarNumberDisabled}>
                  3
                </Text>
              </View>
              <Text style={styles.progressBarTextDisabled}>
                Zahlart/Versand
              </Text>
            </View>
          </View>
        );

      case 'login':
        return (
          <View style={styles.progressBar}>
            <View style={styles.progressBarItem}>
              <View style={styles.progressBarCircleCompleted}>
                <Text style={styles.progressBarNumberCompleted}>
                  &#10003;
                </Text>
              </View>
              <Text style={styles.progressBarTextCompleted}>
                Warenkorb
              </Text>
            </View>
            <View style={styles.progressBarLineCompleted} />
            <View style={styles.progressBarItem}>
              <View style={styles.progressBarCircleCurrent}>
                <Text style={styles.progressBarNumberCurrent}>
                  2
                </Text>
              </View>
              <Text style={styles.progressBarTextCurrent}>
                Login/Gast
              </Text>
            </View>
            <View style={styles.progressBarLineCurrent} />
            <View style={styles.progressBarItem}>
              <View style={styles.progressBarCircleDisabled}>
                <Text style={styles.progressBarNumberDisabled}>
                  3
                </Text>
              </View>
              <Text style={styles.progressBarTextDisabled}>
                Zahlart/Versand
              </Text>
            </View>
          </View>
        );

      case 'delivery':
        return (
          <View style={styles.progressBar}>
            <View style={styles.progressBarItem}>
              <View style={styles.progressBarCircleCompleted}>
                <Text style={styles.progressBarNumberCompleted}>
                  &#10003;
                </Text>
              </View>
              <Text style={styles.progressBarTextCompleted}>
                Login/Gast
              </Text>
            </View>
            <View style={styles.progressBarLineCompleted} />
            <View style={styles.progressBarItem}>
              <View style={styles.progressBarCircleCurrent}>
                <Text style={styles.progressBarNumberCurrent}>
                  3
                </Text>
              </View>
              <Text style={styles.progressBarTextCurrent}>
                Zahlart/Versand
              </Text>
            </View>
            <View style={styles.progressBarLineCurrent} />
            <View style={styles.progressBarItem}>
              <View style={styles.progressBarCircleDisabled}>
                <Text style={styles.progressBarNumberDisabled}>
                  4
                </Text>
              </View>
              <Text style={styles.progressBarTextDisabled}>
                Bestellübersicht
              </Text>
            </View>
          </View>
        );

      case 'preview':
        return (
          <View style={styles.progressBar}>
            <View style={styles.progressBarItem}>
              <View style={styles.progressBarCircleCompleted}>
                <Text style={styles.progressBarNumberCompleted}>
                  &#10003;
                </Text>
              </View>
              <Text style={styles.progressBarTextCompleted}>
                Zahlart/Versand
              </Text>
            </View>
            <View style={styles.progressBarLineCompleted} />
            <View style={styles.progressBarItem}>
              <View style={styles.progressBarCircleCurrent}>
                <Text style={styles.progressBarNumberCurrent}>
                  4
                </Text>
              </View>
              <Text style={styles.progressBarTextCurrent}>
                Bestellübersicht
              </Text>
            </View>
            <View style={styles.progressBarLineCurrent} />
            <View style={styles.progressBarItem}>
              <View style={styles.progressBarCircleDisabled}>
                <Text style={styles.progressBarNumberDisabled}>
                  5
                </Text>
              </View>
              <Text style={styles.progressBarTextDisabled}>
                Fertig
              </Text>
            </View>
          </View>
        );

      case 'payment':
        return (
          <View style={styles.progressBar}>
            <View style={styles.progressBarItem}>
              <View style={styles.progressBarCircleCompleted}>
                <Text style={styles.progressBarNumberCompleted}>
                  &#10003;
                </Text>
              </View>
              <Text style={styles.progressBarTextCompleted}>
                Zahlart/Versand
              </Text>
            </View>
            <View style={styles.progressBarLineCompleted} />
            <View style={styles.progressBarItem}>
              <View style={styles.progressBarCircleCompleted}>
                <Text style={styles.progressBarNumberCompleted}>
                  &#10003;
                </Text>
              </View>
              <Text style={styles.progressBarTextCompleted}>
                Bestellübersicht
              </Text>
            </View>
            <View style={styles.progressBarLineCompleted} />
            <View style={styles.progressBarItem}>
              <View style={styles.progressBarCircleCurrent}>
                <Text style={styles.progressBarNumberCurrent}>
                  5
                </Text>
              </View>
              <Text style={styles.progressBarTextCurrent}>
                Fertig
              </Text>
            </View>
          </View>
        );

      default:
        return (
          <View style={styles.progressBarContainer}>
          </View>
        );
    }
  }
}

const styles = {
  /*Bar styles*/
  progressBar: {
    marginTop: 20,
    marginBottom: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },

  /*Item styles*/
  progressBarItem: {
    width: 110,

    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },

  /*Circle styles*/
  progressBarCircleCompleted: {
    width: 40,
    height: 40,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2ecc71',
    borderRadius: 100
  },
  progressBarCircleCurrent: {
    width: 50,
    height: 50,

    alignItems: 'center',
    justifyContent: 'center',

    color: '#fff',
    backgroundColor: '#1a1a1a',

    borderWidth: 1,
    borderColor: '#1a1a1a',
    borderRadius: 100
  },
  progressBarCircleDisabled: {
    width: 40,
    height: 40,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 100
  },

  /*Number styles*/
  progressBarNumberCompleted: {
    fontSize: 18,

    color: '#2ecc71'
  },
  progressBarNumberCurrent: {
    fontSize: 20,

    color: '#fff'
  },
  progressBarNumberDisabled: {
    fontSize: 18,

    color: '#ccc'
  },

  /*Text styles*/
  progressBarTextCompleted: {
    marginTop: 5,

    fontSize: 10,
    color: '#2ecc71'
  },
  progressBarTextCurrent: {
    marginTop: 5,

    fontSize: 12,
    color: '#1a1a1a'
  },
  progressBarTextDisabled: {
    marginTop: 5,

    fontSize: 10,
    color: '#ccc'
  },

  /*Line styles*/
  progressBarLineCompleted: {
    width: 50,

    borderWidth: 1,
    borderColor: '#2ecc71',
  },
  progressBarLineCurrent: {
    width: 50,

    borderWidth: 1,
    borderColor: '#1a1a1a',
  },
  progressBarLineDisabled: {
    width: 50,

    borderWidth: 1,
    borderColor: '#ccc',
  }
}
