// Modal functionality
class ModalManager {
  constructor() {
    this.init()
  }

  init() {
    // Get all modal triggers and modals
    this.modalTriggers = document.querySelectorAll("[data-modal]")
    this.modals = document.querySelectorAll(".modal")
    this.closeBtns = document.querySelectorAll(".close-btn")
    this.modalOverlays = document.querySelectorAll(".modal-overlay")

    // Bind events
    this.bindEvents()
  }

  bindEvents() {
    // Open modal events
    this.modalTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        const modalId = e.target.getAttribute("data-modal")
        this.openModal(modalId)
      })
    })

    // Close modal events
    this.closeBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const modal = e.target.closest(".modal")
        this.closeModal(modal)
      })
    })

    // Close modal when clicking overlay
    this.modalOverlays.forEach((overlay) => {
      overlay.addEventListener("click", (e) => {
        const modal = e.target.closest(".modal")
        this.closeModal(modal)
      })
    })

    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const activeModal = document.querySelector(".modal.active")
        if (activeModal) {
          this.closeModal(activeModal)
        }
      }
    })

    // Prevent modal from closing when clicking inside the modal content
    document.querySelectorAll(".modal-content").forEach((content) => {
      content.addEventListener("click", (event) => {
        event.stopPropagation()
      })
    })
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId)
    if (modal) {
      // Prevent body scroll
      document.body.style.overflow = "hidden"

      // Show modal
      modal.style.display = "flex"

      // Trigger animation
      setTimeout(() => {
        modal.classList.add("active")
      }, 10)

      // Focus management for accessibility
      const firstFocusable = modal.querySelector("button, input, textarea, select, a[href]")
      if (firstFocusable) {
        firstFocusable.focus()
      }
    }
  }

  closeModal(modal) {
    if (modal && modal.classList.contains("active")) {
      // Remove active class
      modal.classList.remove("active")

      // Hide modal after animation
      setTimeout(() => {
        modal.style.display = "none"
        // Restore body scroll
        document.body.style.overflow = ""
      }, 300)

      // Return focus to trigger button
      const triggerBtn = document.querySelector(`[data-modal="${modal.id}"]`)
      if (triggerBtn) {
        triggerBtn.focus()
      }
    }
  }

  // Public method to close all modals
  closeAllModals() {
    this.modals.forEach((modal) => {
      this.closeModal(modal)
    })
  }
}

// Simple Modal Manager
class SimpleModalManager {
  constructor() {
    this.modal = document.getElementById("modal")
    this.openBtn = document.getElementById("openModal")
    this.closeBtn = document.getElementById("closeModal")
    this.modalOverlay = document.querySelector(".modal-overlay")
    this.modalBox = document.querySelector(".modal-box")

    this.init()
  }

  init() {
    this.bindEvents()
    console.log("Simple Modal System Initialized!")
  }

  bindEvents() {
    // Open modal
    this.openBtn.addEventListener("click", () => {
      this.openModal()
    })

    // Close modal with X button
    this.closeBtn.addEventListener("click", () => {
      this.closeModal()
    })

    // Close modal when clicking outside (overlay)
    this.modalOverlay.addEventListener("click", () => {
      this.closeModal()
    })

    // Prevent modal from closing when clicking inside the modal box
    this.modalBox.addEventListener("click", (event) => {
      event.stopPropagation()
    })

    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal.classList.contains("active")) {
        this.closeModal()
      }
    })
  }

  openModal() {
    // Prevent body scroll
    document.body.style.overflow = "hidden"

    // Show modal
    this.modal.style.display = "flex"
    this.modal.classList.add("active")

    // Focus on close button
    this.closeBtn.focus()
  }

  closeModal() {
    // Hide modal
    this.modal.classList.remove("active")
    this.modal.style.display = "none"

    // Restore body scroll
    document.body.style.overflow = ""

    // Return focus to open button
    this.openBtn.focus()
  }
}

// Initialize modal manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const modalManager = new ModalManager()
  const simpleModalManager = new SimpleModalManager()

  // Make it globally accessible if needed
  window.modalManager = modalManager
  window.simpleModalManager = simpleModalManager

  console.log("Reusable Modal System Initialized!")

  // Add some interactive effects
  const openBtn = document.getElementById("openModal")
  const container = document.querySelector(".container")

  // Add hover effect to container
  container.addEventListener("mouseenter", () => {
    container.style.transform = "translateY(-5px) scale(1.02)"
  })

  container.addEventListener("mouseleave", () => {
    container.style.transform = "translateY(0) scale(1)"
  })

  // Add click effect to open button
  openBtn.addEventListener("mousedown", () => {
    openBtn.style.transform = "translateY(-1px) scale(0.98)"
  })

  openBtn.addEventListener("mouseup", () => {
    openBtn.style.transform = "translateY(-3px) scale(1)"
  })
})

// Additional utility functions
function showNotification(message, type = "info") {
  // Simple notification system (optional enhancement)
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.textContent = message
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === "success" ? "#4CAF50" : "#2196F3"};
        color: white;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

function toggleModal() {
  if (window.modalManager.isOpen()) {
    window.modalManager.close()
  } else {
    window.modalManager.open()
  }
}

// Export for potential use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = ModalManager
}

// Reusable Modal Manager class
class ReusableModalManager {
  constructor() {
    this.modal = document.getElementById("modal")
    this.openBtn = document.getElementById("openModal")
    this.closeBtn = document.getElementById("closeModal")
    this.modalOverlay = document.getElementById("modalOverlay")
    this.modalPage = document.querySelector(".modal-page")
    this.body = document.body

    this.init()
  }

  init() {
    this.bindEvents()
    console.log("Reusable Modal System Initialized!")
  }

  bindEvents() {
    // Open modal event
    this.openBtn.addEventListener("click", () => {
      this.openModal()
    })

    // Close modal events
    this.closeBtn.addEventListener("click", () => {
      this.closeModal()
    })

    // Close modal when clicking overlay (outside the modal)
    this.modalOverlay.addEventListener("click", () => {
      this.closeModal()
    })

    // Prevent modal from closing when clicking inside the modal page
    this.modalPage.addEventListener("click", (event) => {
      event.stopPropagation()
    })

    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal.classList.contains("active")) {
        this.closeModal()
      }
    })

    // Close modal with Enter key when close button is focused
    this.closeBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.closeModal()
      }
    })
  }

  openModal() {
    // Prevent body scroll
    this.body.classList.add("modal-open")
    this.body.style.overflow = "hidden"

    // Show modal
    this.modal.style.display = "flex"

    // Trigger animation after a small delay
    setTimeout(() => {
      this.modal.classList.add("active")
    }, 10)

    // Focus on close button for accessibility
    setTimeout(() => {
      this.closeBtn.focus()
    }, 400)

    // Add some visual feedback
    this.showNotification("Modal opened successfully!", "success")
  }

  closeModal() {
    if (this.modal.classList.contains("active")) {
      // Remove active class to trigger closing animation
      this.modal.classList.remove("active")

      // Hide modal after animation completes
      setTimeout(() => {
        this.modal.style.display = "none"
        // Restore body scroll
        this.body.classList.remove("modal-open")
        this.body.style.overflow = ""
      }, 400)

      // Return focus to open button
      this.openBtn.focus()

      // Add some visual feedback
      this.showNotification("Modal closed successfully!", "info")
    }
  }

  // Utility method for notifications
  showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.textContent = message

    const colors = {
      success: "#28a745",
      info: "#17a2b8",
      warning: "#ffc107",
      error: "#dc3545",
    }

    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 25px;
      background: ${colors[type] || colors.info};
      color: white;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      font-size: 14px;
      font-weight: 500;
    `

    document.body.appendChild(notification)

    // Slide in
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 100)

    // Slide out and remove
    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification)
        }
      }, 300)
    }, 3000)
  }

  // Public method to programmatically open modal
  open() {
    this.openModal()
  }

  // Public method to programmatically close modal
  close() {
    this.closeModal()
  }

  // Check if modal is currently open
  isOpen() {
    return this.modal.classList.contains("active")
  }
}
