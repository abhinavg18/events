module.exports = class Connection {
    constructor(connectionId, name, topic, details, date,time) {
      this.connectionId = connectionId;
      this.name = name;
      this.topic = topic;
      this.details = details;
      this.date = date;
      this.time = time;
    }
    get getConnectionId() {
      return this.connectionId;
    }

    get getName() {
      return this.name;
    }
    get getTopic() {
      return this.topic;
    }
    get getDetails() {
      return this.details;
    }
    get getDate() {
      return this.date;
    }
    get getTime() {
      return this.time;
    }
    set setConnectionId(connectionId) {
      this.connectionId = connectionId;
    }
    set setName(name) {
      this.name = name;
    }
    set setTopic(topic) {
      this.topic = topic;
    }
    set setDetails(details) {
      this.details = details;
    }
    set setDate(date) {
      this.date = date;
    }
    set setTime(time) {
      this.time = time;
    }
  }