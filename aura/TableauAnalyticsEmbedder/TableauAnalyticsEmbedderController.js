({
    doInit: function(component, event, helper) {
        console.log('Tableau Analytics Embedder initializing...');
        helper.initializeComponent(component);
    },
    
    refreshDashboard: function(component, event, helper) {
        console.log('Refreshing analytics dashboard...');
        component.set("v.isLoading", true);
        component.set("v.hasError", false);
        
        // Get the analytics dashboard component and refresh it
        var dashboard = component.find("analyticsDashboard");
        if (dashboard) {
            try {
                // Call refresh method on the analytics dashboard
                dashboard.refresh();
                helper.showToast(component, 'Success', 'Dashboard refreshed', 'success');
            } catch (error) {
                console.error('Error refreshing dashboard:', error);
                helper.handleError(component, 'Failed to refresh dashboard: ' + error.message);
            }
        } else {
            helper.handleError(component, 'Dashboard component not found');
        }
        
        // Reset loading state after a brief delay
        setTimeout(function() {
            component.set("v.isLoading", false);
        }, 1000);
    },
    
    shareDashboard: function(component, event, helper) {
        console.log('Sharing analytics dashboard...');
        
        var dashboard = component.find("analyticsDashboard");
        if (dashboard) {
            try {
                // Call share method on the analytics dashboard
                dashboard.share();
                helper.showToast(component, 'Info', 'Opening sharing options', 'info');
            } catch (error) {
                console.error('Error sharing dashboard:', error);
                helper.showToast(component, 'Warning', 'Sharing not available', 'warning');
            }
        } else {
            helper.showToast(component, 'Error', 'Dashboard not loaded', 'error');
        }
    },
    
    showDashboardSettings: function(component, event, helper) {
        console.log('Opening dashboard settings...');
        helper.showToast(component, 'Info', 'Dashboard settings would open here', 'info');
        
        // In a real implementation, this could open a modal with dashboard configuration options
        // For now, just show available configuration
        var dashboardId = component.get("v.dashboardId");
        var filter = component.get("v.filter");
        
        var settingsMessage = 'Dashboard Configuration:\n';
        settingsMessage += 'ID: ' + (dashboardId || 'Not specified') + '\n';
        settingsMessage += 'Filter: ' + (filter || 'None') + '\n';
        settingsMessage += 'Variant: ' + component.get("v.variant");
        
        console.log(settingsMessage);
    },
    
    retryLoadDashboard: function(component, event, helper) {
        console.log('Retrying dashboard load...');
        component.set("v.isLoading", true);
        component.set("v.hasError", false);
        
        // Reinitialize the component
        helper.initializeComponent(component);
    },
    
    onDashboardReady: function(component, event, helper) {
        console.log('Analytics dashboard ready event received');
        
        component.set("v.isLoading", false);
        component.set("v.hasError", false);
        
        var params = event.getParams();
        console.log('Dashboard ready params:', params);
        
        helper.showToast(component, 'Success', 'Analytics dashboard loaded successfully', 'success');
        
        // Extract dashboard information if available
        if (params && params.dashboardId) {
            component.set("v.dashboardId", params.dashboardId);
        }
    },
    
    onDashboardError: function(component, event, helper) {
        console.error('Analytics dashboard error event received');
        
        var params = event.getParams();
        console.error('Dashboard error params:', params);
        
        var errorMessage = 'Failed to load analytics dashboard';
        if (params && params.error) {
            errorMessage += ': ' + params.error;
        }
        
        helper.handleError(component, errorMessage);
    },
    
    onDashboardFilterChange: function(component, event, helper) {
        console.log('Analytics dashboard filter change event received');
        
        var params = event.getParams();
        console.log('Filter change params:', params);
        
        // Update the filter attribute
        if (params && params.filter) {
            component.set("v.filter", JSON.stringify(params.filter));
        }
        
        // Show toast notification for filter changes
        helper.showToast(component, 'Info', 'Dashboard filters updated', 'info');
    }
})
