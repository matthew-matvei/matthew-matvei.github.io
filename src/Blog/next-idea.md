# Either pattern for Network calls

* Identify problem
  * Background context
  * Usual code pattern that was arising
* Introduce Either / Result monad
  * General concept
  * Code example in JavaScript
* Diff Either vs non-Either code
* Demonstrate extensions (bind, default etc.)
* When not to use it
  * Team doesn't understand it / want it
* Some common confusions
  * The function of 'HandleOk' and 'HandleFailure'
  * This is a pipeline, not a builder object, so callback functions are (optionally)
    invoked in order before continuing. I.e., the placement of a 'handleFailure' matters