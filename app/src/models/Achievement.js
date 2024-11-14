export default class Achievement {
  constructor(id, name, description, badge_url) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.badge_url = badge_url ? badge_url : "";
  }
}
