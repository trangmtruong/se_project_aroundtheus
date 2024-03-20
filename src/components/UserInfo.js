export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    //Take an object with the selectors of two elements into the constructor:
    //one for the profile’s name element and one for its job element
    this._nameEl = document.querySelector(nameSelector);
    this._jobEl = document.querySelector(jobSelector);
    this._avatarEl = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    //returns an object containing information about the user
    // this method will be handy for cases when it's necessary to display the user data in the open form

    return {
      name: this._nameEl.textContent,
      job: this._jobEl.textContent,
    };
  }
  setUserInfo(name, job) {
    //takes new user data and adds it to the page
    //This method should be used after successful submission of the profile form
    this._nameEl.textContent = name;
    this._jobEl.textContent = job;
  }
  setUserAvatar(avatar) {
    this._avatarEl.src = avatar;
  }
}

// {name: jaque cousrauo, job: exploer}

//profileUserInfo.setUserInfo("Bill", "caprenter");

//footerText.textContent = "Helllo";
