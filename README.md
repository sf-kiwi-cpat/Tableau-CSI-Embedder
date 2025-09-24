# 📊 Tableau CSI Embedder: Installation Guide

This guide will walk you through the steps to embed the Customer Signals Intelligence (CSI) Dashboard into a Salesforce Lightning page, specifically for use cases like the **Service Command Center** (formerly known as Omni Supervisor).

---

## 🛠️ Required Components

To successfully embed the dashboard, you'll need the following components:

* **Lightning Component:** `TableauAnalyticsEmbedder`
* **Lightning Application:** `TableauCSIApp`
* **Visualforce Page:** `CSI_Tab_Next_dashboard`

---

## 🚀 Installation Steps

Follow these steps in order to install and configure the components:

1.  **Create the Lightning Component:**
    * In the Salesforce Developer Console, create a new Lightning Component.
    * Name it **`TableauAnalyticsEmbedder`**.
    * Copy the contents from the `/aura/TableauAnalyticsEmbedder` folder and paste them into the new component.

2.  **Create the Lightning Application:**
    * In the Salesforce Developer Console, create a new Lightning Application.
    * Name it **`TableauCSIApp`**.
    * Copy the contents from the `/aura/TableauCSIApp` folder and paste them into the new application.

3.  **Create the Visualforce Page:**
    * In Salesforce Setup, navigate to **Visualforce Pages**.
    * Create a new Visualforce page.
    * Name it **`CSI_Tab_Next_dashboard`**.
    * Copy the contents from the `/pages/` folder and paste them into the page's markup.

4.  **Configure the Supervisor Page:**
    * From **Setup**, open the **App Builder**.
    * Create a new **Supervisor Page**.
    * Drag and drop the **`CSI_Tab_Next_dashboard`** Visualforce page onto the new page layout.

5.  **Add to Supervisor Configuration:**
    * Navigate to your **Supervisor Configuration** in Salesforce Setup.
    * Add the newly created **Supervisor Page** to your configuration to make it accessible to your users.

